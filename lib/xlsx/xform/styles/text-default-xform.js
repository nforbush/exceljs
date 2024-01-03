const CompositeExtXform = require('../composite-ext-xform');
const ShapePropertiesXform = require("./shape-properties-xform");
const BodyPropertiesXform = require("./body-properties-xform");
const ExtensionListXform = require("./extension-list-xform");
// const ListStyleXform = require("./list-style-xform");

class TextDefaultXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.textdefault?view=openxml-2.8.1
        this.tag = "a:txDef";
        this.map = {
            "a:bodyPr" : new BodyPropertiesXform(),
            // "a:extLst" : new ExtensionListXform(),
            // "a:lstStyle" : new ListStyleXform(),
            "a:spPr" : new ShapePropertiesXform({tag: "a:spPr"}),
            // "style
        };
    }
}

module.exports = TextDefaultXform;
