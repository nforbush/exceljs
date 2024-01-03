const BaseXform = require('../base-xform');

class CtrlPropXform extends BaseXform {
    get tag() {
        return 'formControlPr';
    }

    parseOpen(node) {
        switch (node.name) {
            case this.tag:
                this.model = {};
                Object.entries(node.attributes).forEach(([key, value]) => {
                    this.model[key] = value;
                });
                return true;
            default:
                return false;
        }
    }

    parseText() {}

    parseClose() {
        return false;
    }
}

module.exports = CtrlPropXform;
