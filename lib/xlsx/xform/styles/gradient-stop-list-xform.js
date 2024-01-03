const CompositeExtXform = require('../composite-ext-xform');
const ColorXform = require("./color-xform");

class GradientStopListXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "a:gsLst";
        this.isArrayList = ["gs"];
        this.map = {
            "a:gs" : new ColorXform({tag: "a:gs"}),
        };
    }
}

module.exports = GradientStopListXform;
