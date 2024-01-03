const CompositeExtXform = require('../composite-ext-xform');
const TwoCellAnchor1Xform = require("./two-cell-anchor1-xform");

class ChoiceDrawingXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "mc:Choice";
        this.map = {
            'xdr:twoCellAnchor': new TwoCellAnchor1Xform(),
        };
    }

}

module.exports = ChoiceDrawingXform;
