const CompositeExtXform = require('../composite-ext-xform');

class ChartDrawingXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "c:chart";
        this.map = {};
    }
}
module.exports = ChartDrawingXform;