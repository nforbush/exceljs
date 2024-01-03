const CompositeExtXform = require('../composite-ext-xform');
const ShapePropertiesXform = require("../styles/shape-properties-xform");

class SeriesLinesXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/ka-ge/dotnet/api/documentformat.openxml.drawing.charts.serieslines?view=openxml-2.8.1
        this.tag = "c:serLines";
        this.map = {
            "c:spPr" : new ShapePropertiesXform(),
        };
    }
}

module.exports = SeriesLinesXform;
