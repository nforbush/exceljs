const _ = require('../../../utils/under-dash');
const utils = require('../../../utils/utils');
const colCache = require('../../../utils/col-cache');
const BaseXform = require('../base-xform');
const Range = require('../../../doc/range');

function assign(definedName, attributes, name, defaultValue) {
  const value = attributes[name];
  if (value !== undefined) {
    definedName[name] = value;
  } else if (defaultValue !== undefined) {
    definedName[name] = defaultValue;
  }
}

function assignBool(definedName, attributes, name, defaultValue) {
  const value = attributes[name];
  if (value !== undefined) {
    definedName[name] = utils.parseBoolean(value);
  } else if (defaultValue !== undefined) {
    definedName[name] = defaultValue;
  }
}

function optimiseDataValidations(model) {
  // Squeeze alike data validations together into rectangular ranges
  // to reduce file size and speed up Excel load time
  const dvList = _.map(model, (dataValidation, address) => ({
    address,
    dataValidation,
    marked: false,
  })).sort((a, b) => _.strcmp(a.address, b.address));
  const dvMap = _.keyBy(dvList, 'address');
  const matchCol = (addr, height, col) => {
    for (let i = 0; i < height; i++) {
      const otherAddress = colCache.encodeAddress(addr.row + i, col);
      if (!model[otherAddress] || !_.isEqual(model[addr.address], model[otherAddress])) {
        return false;
      }
    }
    return true;
  };
  return dvList
    .map(dv => {
      if (!dv.marked) {
        const addr = colCache.decodeEx(dv.address);
        if (addr.dimensions) {
          dvMap[addr.dimensions].marked = true;
          return {
            ...dv.dataValidation,
            sqref: dv.address,
          };
        }

        // iterate downwards - finding matching cells
        let height = 1;
        let otherAddress = colCache.encodeAddress(addr.row + height, addr.col);
        while (model[otherAddress] && _.isEqual(dv.dataValidation, model[otherAddress])) {
          height++;
          otherAddress = colCache.encodeAddress(addr.row + height, addr.col);
        }

        // iterate rightwards...

        let width = 1;
        while (matchCol(addr, height, addr.col + width)) {
          width++;
        }

        // mark all included addresses
        for (let i = 0; i < height; i++) {
          for (let j = 0; j < width; j++) {
            otherAddress = colCache.encodeAddress(addr.row + i, addr.col + j);
            dvMap[otherAddress].marked = true;
          }
        }

        if (height > 1 || width > 1) {
          const bottom = addr.row + (height - 1);
          const right = addr.col + (width - 1);
          return {
            ...dv.dataValidation,
            sqref: `${dv.address}:${colCache.encodeAddress(bottom, right)}`,
          };
        }
        return {
          ...dv.dataValidation,
          sqref: dv.address,
        };
      }
      return null;
    })
    .filter(Boolean);
}

class DataValidationsXform extends BaseXform {
  get tag() {
    return 'dataValidations';
  }

  render(xmlStream, model) {
    const optimizedModel = optimiseDataValidations(model);
    if (optimizedModel.length) {
      xmlStream.openNode('dataValidations', {count: optimizedModel.length});

      optimizedModel.forEach(value => {
        xmlStream.openNode('dataValidation');

        if (value.type !== 'any') {
          xmlStream.addAttribute('type', value.type);

          if (value.operator && value.type !== 'list' && value.operator !== 'between') {
            xmlStream.addAttribute('operator', value.operator);
          }
          if (value.allowBlank) {
            xmlStream.addAttribute('allowBlank', '1');
          }
        }
        if (value.showInputMessage) {
          xmlStream.addAttribute('showInputMessage', '1');
        }
        if (value.promptTitle) {
          xmlStream.addAttribute('promptTitle', value.promptTitle);
        }
        if (value.prompt) {
          xmlStream.addAttribute('prompt', value.prompt);
        }
        if (value.showErrorMessage) {
          xmlStream.addAttribute('showErrorMessage', '1');
        }
        if (value.errorStyle) {
          xmlStream.addAttribute('errorStyle', value.errorStyle);
        }
        if (value.errorTitle) {
          xmlStream.addAttribute('errorTitle', value.errorTitle);
        }
        if (value.error) {
          xmlStream.addAttribute('error', value.error);
        }
        xmlStream.addAttribute('sqref', value.sqref);
        (value.formulae || []).forEach((formula, index) => {
          xmlStream.openNode(`formula${index + 1}`);
          if (value.type === 'date') {
            xmlStream.writeText(utils.dateToExcel(new Date(formula)));
          } else {
            xmlStream.writeText(formula);
          }
          xmlStream.closeNode();
        });
        xmlStream.closeNode();
      });
      xmlStream.closeNode();
    }
  }

  parseOpen(node) {
    switch (node.name) {
      case 'dataValidations':
        this.model = {};
        return true;

      case 'dataValidation': {
        this._address = node.attributes.sqref;
        const dataValidation = {type: node.attributes.type || 'any', formulae: []};

        if (node.attributes.type) {
          assignBool(dataValidation, node.attributes, 'allowBlank');
        }
        assignBool(dataValidation, node.attributes, 'showInputMessage');
        assignBool(dataValidation, node.attributes, 'showErrorMessage');

        switch (dataValidation.type) {
          case 'any':
          case 'list':
          case 'custom':
            break;
          default:
            assign(dataValidation, node.attributes, 'operator', 'between');
            break;
        }
        assign(dataValidation, node.attributes, 'promptTitle');
        assign(dataValidation, node.attributes, 'prompt');
        assign(dataValidation, node.attributes, 'errorStyle');
        assign(dataValidation, node.attributes, 'errorTitle');
        assign(dataValidation, node.attributes, 'error');

        this._dataValidation = dataValidation;
        return true;
      }

      case 'formula1':
      case 'formula2':
        this._formula = [];
        return true;

      default:
        return false;
    }
  }

  parseText(text) {
    if (this._formula) {
      this._formula.push(text);
    }
  }

  parseClose(name) {
    switch (name) {
      case 'dataValidations':
        return false;
      case 'dataValidation': {
        if (!this._dataValidation.formulae || !this._dataValidation.formulae.length) {
          delete this._dataValidation.formulae;
          delete this._dataValidation.operator;
        }
        // *** ADD ***
        // see if common formula
        let formulaeRanges = null;
        if (this._dataValidation.formulae) {
          formulaeRanges = [null, null];
          this._dataValidation.formulae.forEach((formula, index) => {
            if (typeof formula === 'string') {
              const regexp = /[A-Z]+\d+/; // for now, no sheet specification
              if (formula.match(regexp))
                formulaeRanges[index] = new Range(formula);
            }
          });
          if (!formulaeRanges.filter(formula => formula !== null).length)
            formulaeRanges = null;
        }
        // *** ADD END ***
        // The four known cases: 1. E4:L9 N4:U9  2.E4 L9  3. N4:U9  4. E4
        const list = this._address.split(/\s+/g) || [];
        // *** ADD ***
        // sort the list by converting to range and comparing row/top
        list.forEach((addr, index)=> {
          list[index] = {address: addr, range: new Range(addr)};
        });
        list.sort((a, b) => a.range.top - b.range.top);
        // *** ADD END ***
        list.forEach(addr => {
          // *** ADD ***
          const rangeFirst = list[0].range;
          // make rangeFirst one cell
          rangeFirst.model.bottom = rangeFirst.model.top;
          rangeFirst.model.right = rangeFirst.model.left;
          // *** ADD END ***
          if (addr.address.includes(':')) {       // *** MODIFY
            const range = new Range(addr.address);
            range.forEachAddress(address => {
              if (this.model[address] === undefined) {              // *** ADD ***
                const dv = formulaeRanges ? this.adjustFormulaeRanges(this._dataValidation, address, formulaeRanges, rangeFirst) : null;   // *** ADD ***
                this.model[address] = dv || this._dataValidation;   // *** MODIFY ***
              }                                                     // *** ADD ***
            });
          } else if (this.model[addr.address] === undefined) {             // *** ADD ***
              const dv = formulaeRanges ? this.adjustFormulaeRanges(this._dataValidation, addr.address, formulaeRanges, rangeFirst) : null;   // *** ADD ***
              this.model[addr.address] = dv || this._dataValidation;  // *** MODIFY ***
          }
        });
        return true;
      }
      case 'formula1':
      case 'formula2': {
        let formula = this._formula.join('');
        switch (this._dataValidation.type) {
          case 'whole':
          case 'textLength':
            formula = parseInt(formula, 10);
            break;
          case 'decimal':
            formula = parseFloat(formula);
            break;
          case 'date':
            formula = utils.excelToDate(parseFloat(formula));
            break;
          default:
            break;
        }
        this._dataValidation.formulae.push(formula);
        this._formula = undefined;
        return true;
      }
      default:
        return true;
    }
  }

  // *** ADD ***
  adjustFormulaeRanges(_dataValidation, address, formulaeRanges, rangeFirst) {
    if (!formulaeRanges)
      return null;
    let dv = null;
    const range = new Range(address);
    formulaeRanges.forEach((formula, index) => {
      if (formulaeRanges[index]) {
        if (!dv)
          dv = JSON.parse(JSON.stringify(_dataValidation)); // create new
        dv.formulae[index] = new Range(formula.top + (range.top - rangeFirst.top), formula.left + (range.left - rangeFirst.left), formula.bottom + (range.bottom - rangeFirst.bottom), formula.right + (range.right - rangeFirst.right)).tl;
      }
    });
    return dv;
  }
  // *** ADD END ***
}

module.exports = DataValidationsXform;
