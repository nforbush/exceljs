const BaseCellAnchorXform = require('./base-cell-anchor-xform');
const StaticXform = require('../static-xform');

const CellPositionXform = require('./cell-position-xform');
const PicXform = require('./pic-xform');
const ShapeDrawingXform = require("./shape-drawing-xform"); // *** ADD ***
const GraphicFrameXform = require("./graphic-frame-xform"); // *** ADD ***

class TwoCellAnchorXform extends BaseCellAnchorXform {
  constructor() {
    super();

    this.map = {
      'xdr:from': new CellPositionXform({tag: 'xdr:from'}),
      'xdr:to': new CellPositionXform({tag: 'xdr:to'}),
      'xdr:pic': new PicXform(),
      'xdr:clientData': new StaticXform({tag: 'xdr:clientData'}),
    };
  }

  get tag() {
    return 'xdr:twoCellAnchor';
  }

  prepare(model, options) {
    this.map['xdr:pic'].prepare(model.picture, options);
  }

  render(xmlStream, model) {
    xmlStream.openNode(this.tag, {editAs: model.range.editAs || 'oneCell'});

    this.map['xdr:from'].render(xmlStream, model.range.tl);
    this.map['xdr:to'].render(xmlStream, model.range.br);
    this.map['xdr:pic'].render(xmlStream, model.picture);
    this.map['xdr:clientData'].render(xmlStream, {});

    xmlStream.closeNode();
  }

  // *** ADD ***
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    switch (node.name) {
      case this.tag:
        if (!this.map['xdr:sp'])
          this.map['xdr:sp'] = new ShapeDrawingXform();
        if (!this.map['xdr:graphicFrame'])
          this.map['xdr:graphicFrame'] = new GraphicFrameXform();
        this.reset();
        this.model = {
          range: {
            editAs: node.attributes.editAs || 'oneCell',
          },
        };
        break;
      default:
        this.parser = this.map[node.name];
        if (this.parser) {
          this.parser.parseOpen(node);
        }
        break;
    }
    return true;
  }
  // *** ADD END ***

  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.parser = undefined;
      }
      return true;
    }
    switch (name) {
      case this.tag:
        this.model.range.tl = this.map['xdr:from'].model;
        this.model.range.br = this.map['xdr:to'].model;
        this.model.picture = this.map['xdr:pic'].model;
        // *** ADD ***
        this.model.shape = undefined;
        const shape = this.map['xdr:sp'].map;
        if (shape) {
          this.model.shape = {};
          this.model.shape.nvSpPr = shape["xdr:nvSpPr"];
          this.model.shape.nvSpPr.cNvPr = this.model.shape.nvSpPr.map["xdr:nvSpPr"];
        }
        this.model.graphicFrame = undefined;
        const graphicFrame = this.map['xdr:graphicFrame'].map;
        if (graphicFrame) {
          this.model.graphicFrame = {};
          this.model.graphicFrame.nvGraphicFramePr = graphicFrame["xdr:nvGraphicFramePr"];
          this.model.graphicFrame.nvGraphicFramePr.cNvPr = this.model.graphicFrame.nvGraphicFramePr.map["xdr:cNvPr"];

          this.model.graphicFrame.graphic = graphicFrame["a:graphic"];
          this.model.graphicFrame.graphic.graphicData = this.model.graphicFrame.graphic.map["a:graphicData"];
          this.model.graphicFrame.graphic.graphicData.chart = undefined;
          if (this.model.graphicFrame.graphic.graphicData.map["c:chart"] && this.model.graphicFrame.graphic.graphicData.map["c:chart"].model) {
            this.model.graphicFrame.graphic.graphicData.chart = this.model.graphicFrame.graphic.graphicData.map["c:chart"];
            this.model.graphicFrame.graphic.graphicData.chart.rId =  this.model.graphicFrame.graphic.graphicData.chart.model.rid;
          }
          //this.model.graphicFrame.graphic.graphicData.chart.rId = this.model.graphicFrame.graphic.graphicData.chart.model.attributes.rid;
        }
        // *** ADD END ***
        return false;
      default:
        // could be some unrecognised tags
        return true;
    }
  }

  reconcile(model, options) {
    model.medium = this.reconcilePicture(model.picture, options);
  }
}

module.exports = TwoCellAnchorXform;
