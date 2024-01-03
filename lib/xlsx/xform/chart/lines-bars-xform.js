const CompositeExtXform = require('../composite-ext-xform');
const ShapePropertiesXform = require("../styles/shape-properties-xform");

class LinesBarsXform extends CompositeExtXform {
    constructor(options) {
        super();

        this.tag = options.tag;
        this.map = {
            "c:spPr" : new ShapePropertiesXform({tag: "c:spPr"}),
        };
    }
}

module.exports = LinesBarsXform;
