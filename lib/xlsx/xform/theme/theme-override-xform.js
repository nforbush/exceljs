const CompositeExtXform = require('../composite-ext-xform');
const ColorSchemeXform = require('./color-scheme-xform');
const FontSchemeXform = require('./font-scheme-xform');
const FormatSchemeXform = require('./format-scheme-xform');

class ThemeOverrideXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.themeoverride?view=openxml-2.8.1
        this.tag = "a:themeOverride";
        this.map = {
            "a:clrScheme" : new ColorSchemeXform(),
            "a:fmtScheme" : new FormatSchemeXform(),
            "a:fontScheme" : new FontSchemeXform(),
        };
    }
}

module.exports = ThemeOverrideXform;
