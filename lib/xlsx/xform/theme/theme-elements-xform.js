const ExtLstXform = require("../drawing/ext-lst-xform");
const CompositeExtXform = require('../composite-ext-xform');
const ColorSchemeXform = require('./color-scheme-xform');
const FontSchemeXform = require('./font-scheme-xform');
const FormatSchemeXform = require('./format-scheme-xform');

class ThemeElementsXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.themeelements?view=openxml-2.8.1
        this.tag = "a:themeElements";
        this.map = {
            "a:clrScheme" : new ColorSchemeXform(),
            "a:extLst" : new ExtLstXform(),
            "a:fmtScheme" : new FormatSchemeXform(),
            "a:fontScheme" : new FontSchemeXform(),
        };
    }
}

module.exports = ThemeElementsXform;
