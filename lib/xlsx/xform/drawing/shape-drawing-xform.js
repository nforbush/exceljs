const CompositeExtXform = require('../composite-ext-xform');
const NvSpPrXform = require("./nv-sp-pr-xform");
const ShapePropertiesXform = require("../styles/shape-properties-xform");
const TextBodyXform = require("./text-body-xform");
const ShapeStyleXform = require("../styles/shape-style-xform");

class ShapeDrawingXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.spreadsheet.shape?redirectedfrom=MSDN&view=openxml-2.8.1#properties
        this.tag = "xdr:sp";
        this.map = {
            "xdr:nvSpPr" : new NvSpPrXform(),
            "xdr:spPr" : new ShapePropertiesXform({tag: "xdr:spPr"}),
            "xdr:style" : new ShapeStyleXform({tag: "xdr:style"}),
            "xdr:txBody" : new TextBodyXform(),
        };
    }
}
module.exports = ShapeDrawingXform;