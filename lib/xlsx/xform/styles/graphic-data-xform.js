const CompositeExtXform = require('../composite-ext-xform');
const ChartDrawingXform = require("../drawing/chart-drawing-xform");

class GraphicDataXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "a:graphicData";
        this.map = {
            "c:chart" : new ChartDrawingXform(),
        }
    }
}
module.exports = GraphicDataXform;