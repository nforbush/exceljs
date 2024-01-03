const ExtLstXform = require("../drawing/ext-lst-xform");
const CompositeExtXform = require('../composite-ext-xform');
const ThemeElementsXform = require("./theme-elements-xform");
const ObjectDefaultsXform = require("../styles/object-defaults-xform");
// const CustomColorXform = require("./color-scheme-xform");
// const ColorSchemeXform = require("./color-scheme-xform");

class ThemeXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.theme?view=openxml-2.8.1
        this.tag = "a:theme";
        this.map = {
            // "a:custClrLst" : new ListExtXform({tag: "a:custClrLst", childXform: new CustomColorXform()}),
            "a:extLst" : new ExtLstXform(),
            // "a:extraClrSchemeLst" : new ListExtXform({tag: "a:extraClrSchemeLst", childXform: new ColorSchemeXform()}),
            "a:objectDefaults" : new ObjectDefaultsXform(),
            "a:themeElements" : new ThemeElementsXform(),
        };
    }
}

module.exports = ThemeXform;
