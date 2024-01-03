const CompositeExtXform = require('../composite-ext-xform');
const StringXform = require('../simple/string-xform');
const IntegerXform = require('../simple/integer-xform');
const BooleanXform = require('../simple/boolean-xform');
const SeriesXform = require('./series-xform');
const MarkerXform = require("./marker-xform");
const ShapeXform = require("../styles/shape-style-xform");
const DataLabelsXform = require("./data-labels-xform");
const LinesBarsXform = require("./lines-bars-xform");
const UpDownBarsXform = require("./up-down-bars-xform");

class ChartTypeXform extends CompositeExtXform {
    constructor(options) {
        super();

        this.tag = options.tag;
        this.isArrayList = ["axId", "ser"];
        // area3D: https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.area3dchart?view=openxml-2.8.1
        // area: https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.areachart?view=openxml-2.8.1
        // bar3D:

        // scatter: https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.scatterChart?view=openxml-2.8.1

        this.map = {
            "c:axId" : new IntegerXform({tag: "c:axId", attr: "val"}),  // radar, scatter
            "c:barDir" : new StringXform({tag: "c:barDir", attr: "val"}), // bar3D, bar
            "c:bubble3D" : new BooleanXform({tag: "c:bubble3D"}),   // bubble
            "c:bubbleScale" : new IntegerXform({tag: "c:bubble3D"}),   // bubble
            "c:dLbls" : new DataLabelsXform(),  // bubble
            "c:dropLines" : new LinesBarsXform({tag: "c:dropLines"}), // line
            // extLst
            "c:firstSliceAng" : new IntegerXform({tag: "c:firstSliceAng", attr: "val"}),    // doughnut, pie
            "c:gapDepth" : new IntegerXform({tag: "c:gapDepth", attr: "val"}),  // area3D, bar3D
            "c:gapWidth" : new IntegerXform({tag: "c:gapWidth", attr: "val"}),  // bar3D
            "c:grouping" : new StringXform({tag: "c:grouping", attr: "val"}),
            "c:hiLowLines" : new LinesBarsXform({tag: "c:hiLowLines"}), // line
            "c:holeSize" : new IntegerXform({tag: "c:holeSize", attr: "val"}),  // doughnut
            "c:marker" : new MarkerXform(), // line
            "c:overlap" : new IntegerXform({tag: "c:overlap", attr: "val"}),
            "c:radarStyle" : new StringXform({tag: "c:radarStyle", attr: "val"}),   // radar
            "c:scatterStyle" : new StringXform({tag: "c:scatterStyle", attr: "val"}),   // scatter
            "c:ser" : new SeriesXform(),
            "c:showNegBubbles" : new BooleanXform({tag: "c:showNegBubbles"}),   // bubble
            "c:sizeRepresents" : new IntegerXform({tag: "c:sizeRepresents", attr: "val"}),  // bubble
            "c:smooth" : new IntegerXform({tag: "c:smooth", attr: "val"}),      // line
            "c:sp" : new ShapeXform({tag: "c:sp"}), // bar3D
            "c:upDownBars" : new UpDownBarsXform(),              // line
            "c:varyColors" : new BooleanXform({tag: "c:varyColors", attr: "val"}),
        };
    }
}

module.exports = ChartTypeXform;
