const CompositeExtXform = require('../composite-ext-xform');
const ExtensionXform = require("./extension-xform");

class ExtensionListXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.extensionlist?view=openxml-2.8.1
        this.tag = "a:extLst";
        this.isArrayList = ["ext"];
        this.map = {
            "a:ext" : new ExtensionXform(),
        };
    }
}

module.exports = ExtensionListXform;
