const ExtLstXform = require("../drawing/ext-lst-xform");
const CompositeExtXform = require('../composite-ext-xform');
const ColorXform = require("../styles/color-xform");

class ColorSchemeXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.colorscheme?view=openxml-2.8.1
        this.tag = "a:clrScheme";
        this.map = {
            "a:accent1" : new ColorXform({tag: "a:accent1"}),
            "a:accent2" : new ColorXform({tag: "a:accent2"}),
            "a:accent3" : new ColorXform({tag: "a:accent3"}),
            "a:accent4" : new ColorXform({tag: "a:accent4"}),
            "a:accent5" : new ColorXform({tag: "a:accent5"}),
            "a:accent6" : new ColorXform({tag: "a:accent6"}),
            "a:dk1" : new ColorXform({tag: "a:dk1"}),
            "a:dk2" : new ColorXform({tag: "a:dk2"}),
            "a:extLst" : new ExtLstXform(),
            "a:folHlink" : new ColorXform({tag: "a:folHlink"}),
            "a:hlink" : new ColorXform({tag: "a:hlink"}),
            "a:lt1" : new ColorXform({tag: "a:lt1"}),
            "a:lt2" : new ColorXform({tag: "a:lt2"}),
        };
    }
}

module.exports = ColorSchemeXform;
