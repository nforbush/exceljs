const CompositeExtXform = require("../composite-ext-xform");
//const BaseCellAnchorXform = require("./base-cell-anchor-xform");
const StaticXform = require('../static-xform');
const CellPositionXform = require('./cell-position-xform');
const PicXform = require('../drawing/pic-xform');
const ShapeDrawingXform = require("./shape-drawing-xform");
const GraphicFrameXform = require("./graphic-frame-xform");

class TwoCellAnchor1Xform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "xdr:twoCellAnchor";
        this.map = {
            'xdr:from': new CellPositionXform({tag: 'xdr:from'}),
            'xdr:to': new CellPositionXform({tag: 'xdr:to'}),
            'xdr:pic': new PicXform(),
            // *** ADD ***
            "xdr:sp": new ShapeDrawingXform(),
            "xdr:graphicFrame": new GraphicFrameXform(),
            // *** ADD END ***
            'xdr:clientData': new StaticXform({tag: 'xdr:clientData'}),
        };
    }
    createNewModel(node) {
        return {
            range: {
                editAs: node.attributes.editAs || 'oneCell',
            },
        };
    }
    reconcile() {
        this.model.range.tl = this.model.from;
        this.model.range.br = this.model.to;
        this.model.picture = this.model.pic;
    }
}
module.exports = TwoCellAnchor1Xform;
