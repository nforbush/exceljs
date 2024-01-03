const HlickClickXform = require("../drawing/hlink-click-xform");
const CompositeExtXform = require('../composite-ext-xform');
const ExtensionListXform = require("../styles/extension-xform");

class CNvSpPrXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "xdr:cNvPr";
        this.map = {
            "a:hlinkClick" : new HlickClickXform(),
            "a:extLst" : new ExtensionListXform(),
        };
    }
}
module.exports = CNvSpPrXform;