const CompositeExtXform = require('../composite-ext-xform');
const IntegerXform = require('../simple/integer-xform');
const StringXform = require('../simple/string-xform');
const NumericPointXform = require("./numeric-point-xform");

class NumberingCacheXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.numberingcache?view=openxml-2.8.1
        this.tag = "c:numCache";
        this.isArrayList = ["pt"];
        this.map = {
            // extLst
            "c:formatCode" : new StringXform({tag: "c:formatCode"}),
            "c:pt" : new NumericPointXform(),
            "c:ptCount" : new IntegerXform({tag: "c:ptCount", attr: "val"}),
        };
    }
}

module.exports = NumberingCacheXform;
