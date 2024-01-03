// const ExtensionListXform = require("./extension-list-xform");
const CompositeExtXform = require("../composite-ext-xform");
const BodyPropertiesXform = require("./body-properties-xform");
const ShapePropertiesXform = require("./shape-properties-xform");

class LineDefaultsXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.linedefault?view=openxml-2.8.1
        this.tag = "a:lnDef";
        this.map = {
            "a:bodyPr" : new BodyPropertiesXform(),
            // "a:extLst" : new ExtensionListXform(),
            // "a:lstStyle" : new ListStyleXform(),
            "a:spPr" : new ShapePropertiesXform({tag: "a:spPr"}),
            // "style" : new TextXform(),
        };
    }
}

module.exports = LineDefaultsXform;
