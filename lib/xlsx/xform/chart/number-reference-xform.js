const CompositeExtXform = require('../composite-ext-xform');
const StringXform = require('../simple/string-xform');
const NumberingCacheXform = require("./numbering-cache-xform");

class NumberReferenceXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.numberreference?view=openxml-2.8.1
        this.tag = "c:numRef";
        this.map = {
            // extLst
            "c:f" : new StringXform({tag: "c:f"}),
            "c:numCache" : new NumberingCacheXform(),
        };
        // this.numCache = undefined;
        // this.f = undefined;
    }
}

module.exports = NumberReferenceXform;
