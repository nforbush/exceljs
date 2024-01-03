const CompositeExtXform = require('../composite-ext-xform');
const IntegerXform = require('../simple/integer-xform');
const NumericPointXform = require("./numeric-point-xform");
const NumberingFormatXform = require("./numbering-format-xform");

class NumberLiteralXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.numberliteral?view=openxml-2.8.1
        this.tag = "c:numLit";
        this.isArrayList = ["pt"];
        this.map = {
            // extLst
            "c:numFmt" : new NumberingFormatXform(),
            "c:pt" : new NumericPointXform(),
            "c:ptCount" : new IntegerXform({tag: "c:ptCount", attr: "val"}),
        };
    }
}

module.exports = NumberLiteralXform;
