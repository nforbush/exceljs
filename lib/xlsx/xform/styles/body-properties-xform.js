const CompositeExtXform = require('../composite-ext-xform');
const BooleanXform = require('../simple/boolean-xform');
// const ExtensionList = require("./extension-list-xform");

class BodyPropertiesXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.bodyproperties?view=openxml-2.8.1
        this.tag = "a:bodyPr";
        this.map = {
            // "a:extLst" : new ExtensionList(),
            // flatTx, noAutofit, normAutofit, prstTxWarp, scene3d, sp3d
            "a:spAutoFit" : new BooleanXform({tag: "a:spAutoFit"}),
        };
    }
}

module.exports = BodyPropertiesXform;
