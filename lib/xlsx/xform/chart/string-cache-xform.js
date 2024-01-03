const CompositeExtXform = require('../composite-ext-xform');
const IntegerXform = require('../simple/integer-xform');
const StringPointXform = require("./string-point-xform");

class StringCacheXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.stringcache?view=openxml-2.8.1
        this.isArrayList = ["pt"];
        this.tag = "c:strCache";
        this.map = {
            "c:pt" : new StringPointXform(),
            "c:ptCount" : new IntegerXform({tag: "c:ptCount", attr: "val"}),
        };
    }
}

module.exports = StringCacheXform;
