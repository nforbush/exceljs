const CompositeExtXform = require('../composite-ext-xform');
const ColorXform = require("../styles/color-xform");
const RunPropertiesXform = require("../styles/run-properties-xform");

class ChartStyleStyleXform extends CompositeExtXform {
    constructor(options) {
        super();

        //
        this.tag = options.tag;
        this.map = {
            "cs:lnRef" : new ColorXform({tag: "cs:lnRef"}),
            "cs:fillRef" : new ColorXform({tag: "cs:fillRef"}),
            "cs:effectRef" : new ColorXform({tag: "cs:effectRef"}),
            "cs:fontRef" : new ColorXform({tag: "cs:fontRef"}),
            "cs:defRPr" : new RunPropertiesXform({tag: "cs:defRPr"}),
        };
    }
}

module.exports = ChartStyleStyleXform;
