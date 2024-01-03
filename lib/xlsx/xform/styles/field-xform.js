const CompositeExtXform = require('../composite-ext-xform');
const StringXform = require("../simple/string-xform");
const ParagraphPropertiesXform = require("./paragraph-properties-xform");

class FieldXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.field?view=openxml-2.8.1
        this.tag = "a:fld";
        this.isArrayList = ["t"];
        this.map = {
            "p:pPr" : new ParagraphPropertiesXform(),
            // a:rPr
            "a:t" : new StringXform({tag: "a:t"}),
        };
    }
}

module.exports = FieldXform;