const CompositeExtXform = require('../composite-ext-xform');
const StringXform = require('../simple/string-xform');
const IntegerXform = require('../simple/integer-xform');
const BooleanXform = require('../simple/boolean-xform');
const FloatXform = require('../simple/float-xform');
const SeriesXform = require('./series-xform');
const DataLabelsXform = require("./data-labels-xform");
const CustomSplitXform = require("./custom-split-xform");
const LinesBarXform = require("./lines-bars-xform");

class OfPieChartXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.ofpiechart?view=openxml-2.7.2
        this.tag = "c:ofPieChart";
        this.map = {
            "c:custSplit" : new CustomSplitXform(),
            "c:dLbls" : new DataLabelsXform(),
            // extLst
            "c:gapWidth" : new IntegerXform({tag: "c:gapWidth", attr: "val"}),
            "c:ofPieType" : new IntegerXform({tag: "c:ofPieType", attr: "val"}),
            "c:secondPieSize" : new IntegerXform({tag: "c:secondPieSize", attr: "val"}),
            "c:ser" : new SeriesXform(),
            "c:serLines" : new LinesBarXform({tag: "c:serLines"}),
            "c:splitPos" : new FloatXform({tag: "c:splitPos", attr: "val"}),
            "c:splitType" : new StringXform({tag: "c:splitType", attr: "val"}),
            "c:varyColors" : new BooleanXform({tag: "c:varyColors", attr: "val"}),
        };
    }
}

module.exports = OfPieChartXform;
