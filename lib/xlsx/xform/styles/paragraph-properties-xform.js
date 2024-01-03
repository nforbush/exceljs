const CompositeExtXform = require('../composite-ext-xform');
// const ExtensionListXform = require("./extension-list-xform");
const StringXform = require('../simple/string-xform');
const RunPropertiesXform = require("./run-properties-xform");

class ParagraphPropertiesXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.paragraphproperties?view=openxml-2.8.1
        this.tag = "a:pPr";
        this.map = {
            // buAutoNum, buBlip, buChar, buClr, buClrTx, buFont, buFontTx, buNone, buSzPct, buSzPts, buSxTx
            "a:defRPr" : new RunPropertiesXform({tag: "a:defRPr"}),
            // "a:extLst" : new ExtensionListXform(),
            // lnSpc, spAft, spcBef, tabLst
            "a:endParaRPr" : new StringXform({tag: "a:endParaPr", attr: "lang"}),
        };
    }
}

module.exports = ParagraphPropertiesXform;
