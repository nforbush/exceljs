// const ExtensionListXform = require("./extension-list-xform");
const CompositeExtXform = require('../composite-ext-xform');
const FontXform = require("../styles/font-xform");

class MajorMinorFontXform extends CompositeExtXform {
    constructor(options) {
        super();

        this.tag = options.tag;
        this.map = {
            "a:cs" : new FontXform({tag: "a:cs"}),
            "a:ea" : new FontXform({tag: "a:ea"}),
            // "a:extLst" : new ExtensionListXform(),
            "a:font" : new FontXform({tag: "a:font"}),
            "a:latin" : new FontXform({tag: "a:latin"}),
        };
    }
}

module.exports = MajorMinorFontXform;
