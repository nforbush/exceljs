const CompositeExtXform = require('../composite-ext-xform');
const IntegerXform = require('../simple/integer-xform');
const StringXform = require('../simple/string-xform');
const TitleXform = require('./title-xform');
const PlotAreaXform = require('./plot-area-xform');
const LegendXform = require('./legend-xform');
const FloorWallXform = require("./floor-wall-xform");
const View3DXform = require("./view-3d-xform");

class ChartXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.chart?view=openxml-2.7.2
        this.tag = "c:chart";
        this.map = {
            "c:autoTitleDeleted" : new IntegerXform({tag: "c:autoTitleDeleted", attr: "val"}),
            "c:backWall" : new FloorWallXform({tag: "c:backWall"}),
            "c:dispBlanksAs" : new StringXform({tag: "c:displayBlanksAs", attr: "val"}),
            // extLst
            "c:floor" : new FloorWallXform({tag: "c:floor"}),
            "c:legend" : new LegendXform(),
            "c:plotArea" : new PlotAreaXform(),
            "c:plotVisOnly" : new IntegerXform({tag: "c:plotVisOnly", attr: "val"}),
            "c:showDLblsOverMax" : new IntegerXform({tag: "c:showDLblsOverMax", attr: "val"}),
            "c:sideWall" : new FloorWallXform({tag: "c:sideWall"}),
            "c:title" : new TitleXform(),
            "c:view3D" : new View3DXform(),
        };
        this.plotArea = undefined;
        this.plotVisOnly = undefined;
    }

    reconcile() {
        this.model.hasTitle = this.model.title !== undefined;
        this.model.hasLegend = this.model.legend !== undefined;
    }

    objectify(chartObject) {
        const interior = chartObject.chartSpace.spPr ? chartObject.chartSpace.spPr.objectify(chartObject) : undefined;
        const plotArea = this.plotArea.objectify(chartObject);
        // const topLeftCell = chartObject.topLeftCell;
        const chart = {
            name: chartObject.name,
            topLeftCell: {objectFormat: chartObject.topLeftCell.addressFullRowColArray},
            type: this.plotArea.chartTypes.length === 1 ? this.plotArea.chartTypes[0].type.name : undefined,
            plotVisibleOnly: this.plotVisOnly === 1,
            backgroundColor: interior ? interior.color : "none",
            width: chartObject.width,
            height: chartObject.height,
            margin: undefined,
            borderColor: interior && interior.border ? interior.border.borderColor : "none",
            borderWidth: interior && interior.border ? interior.border.borderWidth : 0,
            plotBackgroundColor: plotArea.interior && plotArea.interior.color ? plotArea.interior.color : "#FFFFFF",
            plotBorderColor: plotArea.interior && plotArea.interior.border ? plotArea.interior.border.borderColor : "#FFFFFF",
            plotBorderWidth: plotArea.interior && plotArea.interior.border ? plotArea.interior.border.borderWidth : 0,
            plotShadow: false,
            options3d: this.plotArea.chartTypes.length === 1 && this.plotArea.chartTypes[0].type.is3D ? {enabled: true} : undefined,
        };
        if (chart.plotBackgroundColor === "none")
            chart.plotBackgroundColor = "#FFFFFF";
        // if (chart.plotBorderColor === "#FFFFFF")
        //     chart.plotBorderColor = undefined;
        let title = undefined;
        if (this.hasTitle)
            title = this.title.objectify(chartObject);
        const legend = this.hasLegend ? this.legend.objectify(chartObject, plotArea.series[0].data) : {enabled:false};
        return {chart: chart, title: title, legend: legend, plotArea: plotArea};
    }
}

module.exports = ChartXform;
