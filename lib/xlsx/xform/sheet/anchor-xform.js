const Range = require("../../../doc/range");
const CompositeExtXform = require('../composite-ext-xform');
const CellPositionXform = require('../drawing/cell-position-xform');
class AnchorXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "anchor";
        this.map = {
            "from": new CellPositionXform({tag: "from"}),
            "to": new CellPositionXform({tag: "to"}),
        };
    }

    reconcile() {
        this.model.range = new Range(this.model.from.nativeRow+1, this.model.from.nativeCol+1, this.model.to.nativeRow+1, this.model.to.nativeCol+1);
    }
}
module.exports = AnchorXform;