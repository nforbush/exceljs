const CompositeExtXform = require('../composite-ext-xform');
const StringReferenceXform = require('./string-reference-xform');
const RichTextXform = require("./rich-text-xform");

class ChartTextXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.charttext?view=openxml-2.8.1
        this.tag = "c:tx";
        this.map = {
            "c:rich" : new RichTextXform(),
            "c:strRef" : new StringReferenceXform(),
        };
    }
}

module.exports = ChartTextXform;
