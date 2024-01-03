const CompositeExtXform = require('../composite-ext-xform');
const ColorXform = require("./color-xform");

class PatternFillXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.patternfill?view=openxml-2.8.1
        this.tag = "a:pattFill";
        this.model = {};
        this.map = {
            "a:bgClr" : new ColorXform({tag: "a:bgClr"}),
            "a:fgClr" : new ColorXform({tag: "a:fgClr"}),
        };
    }
}

module.exports = PatternFillXform;
