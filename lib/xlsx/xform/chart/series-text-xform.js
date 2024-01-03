const CompositeExtXform = require('../composite-ext-xform');
const StringReferenceXform = require('./string-reference-xform');
const StringXform = require("../simple/string-xform");

class SeriesTextXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.seriestext?view=openxml-2.8.1
        this.tag = "c:tx";
        this.map = {
            "c:strRef" : new StringReferenceXform(),
            "c:v" : new StringXform({tag: "c:v"}),
        };
    }
}

module.exports = SeriesTextXform;
