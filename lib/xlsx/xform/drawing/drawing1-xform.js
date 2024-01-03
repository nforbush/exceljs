const CompositeExtXform = require('../composite-ext-xform');
const AlternateContentDrawingXform = require("./alternate-content-drawing-xform");
const TwoCellAnchor1Xform = require("./two-cell-anchor1-xform");

class Drawing1Xform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "xdr:wsDr";
        this.isArrayList = ["twoCellAnchor", "AlternateContent"];
        this.map = {
            "mc:AlternateContent" : new AlternateContentDrawingXform(),
            'xdr:twoCellAnchor': new TwoCellAnchor1Xform(),
            // 'xdr:oneCellAnchor': new OneCellAnchorXform(),
        };
    }
    reconcile() {
        if (!this.model) {
            this.model = {anchor: []};
        } else {
            this.model.anchors = [].concat(this.model.twoCellAnchor || []);
            (this.model.AlternateContent || []).forEach(ac => {
                this.model.anchors.push(ac.Choice.twoCellAnchor);
            });
        }
    }
}

module.exports = Drawing1Xform;
