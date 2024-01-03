const CompositeExtXform = require('../composite-ext-xform');
const BodyPropertiesXform = require("./body-properties-xform");
const ParagraphXform = require("./paragraph-xform");

class TextPropertiesXform extends CompositeExtXform {
    constructor(options) {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.textproperties?view=openxml-2.8.1
        this.tag = options.tag;
        this.map = {
            "a:bodyPr" : new BodyPropertiesXform(),
            // "a:lstStyle" : new ListStyleXform(),
            "a:p" : new ParagraphXform(),
        };
    }
}

module.exports = TextPropertiesXform;
