const CompositeExtXform = require('../composite-ext-xform');
const RgbColorModelXform = require("../styles/rbg-color-model-xform");

class ChartColorStyleXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.office2013.drawing.chartstyle.colorstyle?view=openxml-2.8.1
        this.tag = "cs:colorStyle";
        this.map = {
            "a:schemeClr": new RgbColorModelXform({tag: "a:schemeClr"}),
            "cs:variation": new RgbColorModelXform({tag: "cs:variation"}),
        }
    }
}

module.exports = ChartColorStyleXform;
