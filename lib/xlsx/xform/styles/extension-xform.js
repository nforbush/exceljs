const CompositeExtXform = require('../composite-ext-xform');
const StringXform = require("../simple/string-xform");

class ExtensionXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.extensionlist?view=openxml-2.8.1
        this.tag = "a:extLst";
        this.map = {
            "a14:compatExt" : new StringXform({tag: "a14:compatExt", attr: "spid"}),
            "a16:creationId" : new StringXform({tag: "a16:creationId", attr: "id"}),
        };
    }
}

module.exports = ExtensionXform;
