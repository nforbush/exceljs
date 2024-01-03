// const ExtensionListXform = require("./extension-list-xform");
const CompositeExtXform = require("../composite-ext-xform");
const ShapeDefaultXform = require("./shape-default-xform");
const LineDefaultXform = require("./line-default-xform");
const TextDefaultXform = require("./text-default-xform");

class ObjectDefaultsXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.objectdefaults?view=openxml-2.8.1
        this.tag = "a:objectDefaults";
        this.map = {
            // "a:extLst" : new ExtensionListXform(),
            "a:lnDef" : new LineDefaultXform(),
            "a:spDef" : new ShapeDefaultXform({tag: "a:spDef"}),
            "a:txDef" : new TextDefaultXform(),
        };
    }
}

module.exports = ObjectDefaultsXform;
