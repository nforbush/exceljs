const CompositeExtXform = require('../composite-ext-xform');
const ShapePropertiesXform = require("../styles/shape-properties-xform");
const ChartTextXform = require("./chart-text-xform");
const TextPropertiesXform = require("../styles/text-properties-xform");
const LayoutXform = require("./layout-xform");
const NumberingFormatXform = require("./numbering-format-xform");

class TrendlineLabelXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.trendlinelabel?view=openxml-2.8.1
        this.tag = "c:trendlineLbl";
        this.map = {
            // extLst
            "c:layout" : new LayoutXform(),
            "c:numFmt" : new NumberingFormatXform(),
            "c:spPr" : new ShapePropertiesXform({tag: "c:spPr"}),
            "c:tx" : new ChartTextXform(),
            "c:txPr" : new TextPropertiesXform({tag: "c:txPr"}),
        };
    }
}

module.exports = TrendlineLabelXform;
