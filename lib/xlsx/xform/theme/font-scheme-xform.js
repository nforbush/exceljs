const ExtLstXform = require("../drawing/ext-lst-xform");
const CompositeExtXform = require('../composite-ext-xform');
const MajorMinorXform = require("../styles/major-minor-font-xform");

class FontSchemeXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.fontscheme?view=openxml-2.8.1
        this.tag = "a:fontScheme";
        this.map = {
            "a:extLst" : new ExtLstXform(),
            "a:majorFont" : new MajorMinorXform({tag: "a:majorFont"}),
            "a:minorFont" : new MajorMinorXform({tag: "a:minorFont"}),
        };
    }
}

module.exports = FontSchemeXform;
