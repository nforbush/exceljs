const CompositeExtXform = require('../composite-ext-xform');
const BodyPropertiesXform = require('../styles/body-properties-xform');
const ListStyleXform = require('../styles/list-style-xform');
const ParagraphXform = require('../styles/paragraph-xform');

class RichTextXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.richtext?view=openxml-2.8.1
        this.tag = "c:rich";
        this.map = {
            "a:bodyPr" : new BodyPropertiesXform(),
            "a:lstStyle" : new ListStyleXform(),
            "a:p" : new ParagraphXform(),
        };
    }
}

module.exports = RichTextXform;
