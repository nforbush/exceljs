const CompositeExtXform = require('../composite-ext-xform');
const IntegerXform = require('../simple/integer-xform');
const StringXform = require('../simple/string-xform');
const DataLabelXform = require("./data-label-xform");
const ShapePropertiesXform = require("../styles/shape-properties-xform");
const TextPropertiesXform = require("../styles/text-properties-xform");
const LeaderLinesXform = require("./leader-lines-xform");
const NumberingFormatXform = require("./numbering-format-xform");

class DataLabelsXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.datalabels?view=openxml-2.8.1
        this.tag = "c:dLbls";
        this.isArrayList = ["dLbl"];
        this.map = {
            "c:delete" : new IntegerXform({tag: "c:delete", attr: "val"}),
            "c:dLbl" : new DataLabelXform(),
            "c:dLblPos" : new IntegerXform({tag: "c:dLblPos", attr: "val"}),
            "c:leaderLines" : new LeaderLinesXform(),
            "c:numFmt" : new NumberingFormatXform(),
            "c:separator" : new StringXform({tag: "c:separator", attr: "val"}),
            "c:showBubbleSize" : new IntegerXform({tag: "c:showBubbleSize", attr: "val"}),
            "c:showCatName" : new IntegerXform({tag: "c:showCatName", attr: "val"}),
            "c:showLegendKey" : new IntegerXform({tag: "c:showLegendKey", attr: "val"}),
            "c:showPercent" : new IntegerXform({tag: "c:showPercent", attr: "val"}),
            "c:showSerName" : new IntegerXform({tag: "c:showSerName", attr: "val"}),
            "c:showVal" : new IntegerXform({tag: "c:showVal", attr: "val"}),
            "c:spPr" : new ShapePropertiesXform({tag: "c:spPr"}),
            "c:txPr" : new TextPropertiesXform({tag: "c:txPr"}),
        };
    }

    objectify(chartObject) {
        const dataLabel = new DataLabelXform();
        return dataLabel.objectify(chartObject, this);
    }
}

module.exports = DataLabelsXform;
