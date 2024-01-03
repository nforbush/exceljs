const CompositeExtXform = require('../composite-ext-xform');
const ParagraphPropertiesXform = require("./paragraph-properties-xform");
const FieldXform = require("./field-xform");
const RunXform = require("./run-xform");
const RunPropertiesXform = require("./run-properties-xform");

class ParagraphXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.paragraph?view=openxml-2.8.1
        this.tag = "a:p";
        this.isArrayList = ["r"];
        this.map = {
            // br
            "a:endParaRPr" : new RunPropertiesXform({tag: "a:endParaRPr"}),
            "a:fld" : new FieldXform(),
            "a:pPr" : new ParagraphPropertiesXform(),
            "a:r"   : new RunXform(),
        };
    }
}

module.exports = ParagraphXform;
