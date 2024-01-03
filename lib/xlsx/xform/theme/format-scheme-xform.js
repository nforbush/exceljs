const CompositeExtXform = require('../composite-ext-xform');
const FillStyleListXform = require("../styles/fill-style-list-xform");
const LineStyleListXform = require("../styles/line-style-list-xform");

class FormatSchemeXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.formatscheme?view=openxml-2.8.1
        this.tag = "a:fmtScheme";
        this.map = {
            "a:bgFillStyleLst" : new FillStyleListXform({tag: "a:bgFillStyleLst"}),
            // "a:effectStyleLst"
            "a:fillStyleLst" : new FillStyleListXform({tag: "a:fillStyleLst"}),
            "a:lnStyleLst" : new LineStyleListXform(),
        };
    }
}

module.exports = FormatSchemeXform;