const CompositeExtXform = require('../composite-ext-xform');
const ChartStyleStyleXform = require("./chart-style-style-xform");

class ChartStyleXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.office2013.drawing.chartstyle.chartstyle?view=openxml-2.8.1
        this.tag = "cs:chartStyle";
        this.map = {
            "cs:axisTitle" : new ChartStyleStyleXform({tag:"cs:axisTitle"}),
            "cs:categoryAxis" : new ChartStyleStyleXform({tag:"cs:categoryAxis"}),
            "cs:chartArea" : new ChartStyleStyleXform({tag:"cs:chartArea"}),
            "cs:dataLabel" : new ChartStyleStyleXform({tag:"cs:dataLabel"}),
            "cs:dataLabelCallout" : new ChartStyleStyleXform({tag:"cs:dataLabelCallout"}),
            "cs:dataPoint" : new ChartStyleStyleXform({tag:"cs:dataPoint"}),
            "cs:dataPoint3D" : new ChartStyleStyleXform({tag:"cs:dataPoint3D"}),
            "cs:dataPointLine" : new ChartStyleStyleXform({tag:"cs:dataPointLine"}),
            "cs:dataPointMarker" : new ChartStyleStyleXform({tag:"cs:dataPointMarker"}),
            "cs:dataPointWireframe" : new ChartStyleStyleXform({tag:"cs:dataPointWireframe"}),
            "cs:dataTable" : new ChartStyleStyleXform({tag:"cs:dataTable"}),
            "cs:downBar" : new ChartStyleStyleXform({tag:"cs:downBar"}),
            "cs:errorBar" : new ChartStyleStyleXform({tag:"cs:errorBar"}),
            "cs:floor" : new ChartStyleStyleXform({tag:"cs:floor"}),
            "cs:gridlineMajor" : new ChartStyleStyleXform({tag:"cs:gridlineMajor"}),
            "cs:gridlineMinor" : new ChartStyleStyleXform({tag:"cs:gridlineMinor"}),
            "cs:hiLoLine" : new ChartStyleStyleXform({tag:"cs:hiLoLine"}),
            "cs:leaderLine" : new ChartStyleStyleXform({tag:"cs:leaderLine"}),
            "cs:legend" : new ChartStyleStyleXform({tag:"cs:legend"}),
            "cs:plotArea" : new ChartStyleStyleXform({tag:"cs:plotArea"}),
            "cs:plotArea3D" : new ChartStyleStyleXform({tag:"cs:plotArea3D"}),
            "cs:seriesAxis" : new ChartStyleStyleXform({tag:"cs:seriesAxis"}),
            "cs:seriesLine" : new ChartStyleStyleXform({tag:"cs:seriesLine"}),
            "cs:title" : new ChartStyleStyleXform({tag:"cs:title"}),
            "cs:trendline" : new ChartStyleStyleXform({tag:"cs:trendline"}),
            "cs:trendlineLabel" : new ChartStyleStyleXform({tag:"cs:trendlineLabel"}),
            "cs:upBar" : new ChartStyleStyleXform({tag:"cs:upBar"}),
            "cs:valueAxis" : new ChartStyleStyleXform({tag:"cs:valueAxis"}),
            "cs:wall" : new ChartStyleStyleXform({tag:"cs:wall"}),
        };
    }
}

module.exports = ChartStyleXform;
