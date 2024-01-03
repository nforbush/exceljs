const CompositeExtXform = require('../composite-ext-xform');
const ColorXform = require("./color-xform");

class ShapeStyleXform extends CompositeExtXform {
    constructor(options) {
        super();

        this.tag = options.tag; // xdr:style
        this.map = {
            "a:lnRef" : new ColorXform({tag: "a:lnRef"}),
            "a:fillRef" : new ColorXform({tag: "a:fillRef"}),
            "a:effectRef" : new ColorXform({tag: "a:effectRef"}),
            "a:fontRef" : new ColorXform({tag: "a:fontRef"}),
        };
    }
}

module.exports = ShapeStyleXform;
