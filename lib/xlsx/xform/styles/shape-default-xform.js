const CompositeExtXform = require('../composite-ext-xform');
// const ExtensionListXform = require("./extension-list-xform");
const ShapePropertiesXform = require("./shape-properties-xform");
const BodyPropertiesXform = require("./body-properties-xform");
// const ListStyleXform = require("./list-style-xform");

class ShapeDefaultXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.shapedefault?view=openxml-2.8.1
        this.tag = "a:spDef";
        this.map = {
            "a:bodyPr": new BodyPropertiesXform(),
            // "a:extLst" : new ExtensionListXform(),
            // a:lstStyle
            "a:spPr": new ShapePropertiesXform({tag: "a:spPr"}),
            // "a:style": new StyleXform(),
        };
    }
}

module.exports = ShapeDefaultXform;
