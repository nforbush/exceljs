const CompositeExtXform = require('../composite-ext-xform');
const GraphicDataXform = require("./graphic-data-xform");

class GraphicXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "a:graphic";
        this.map = {
            "a:graphicData" : new GraphicDataXform(),
        }
    }
}

module.exports = GraphicXform;