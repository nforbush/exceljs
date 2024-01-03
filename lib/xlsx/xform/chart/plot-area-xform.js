const CompositeExtXform = require('../composite-ext-xform');
const ChartTypeXform = require('./chart-type-xform');
const AxisXform = require('./axis-xform');
const ShapePropertiesXform = require("../styles/shape-properties-xform");
const LayoutXform = require("./layout-xform");
const OfPieChartXform = require("./of-pie-chart-xform");

class PlotAreaXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.plotarea?view=openxml-2.7.2
        this.tag = "c:plotArea";
        this.map = {
            "area3DChart" : new ChartTypeXform({tag: "c:area3DChart"}),
            "c:areaChart" : new ChartTypeXform({tag: "c:areaChart"}),
            "c:bar3DChart" : new ChartTypeXform({tag: "c:bar3DChart"}),
            "c:barChart" : new ChartTypeXform({tag: "c:barChart"}),
            "c:bubbleChart" : new ChartTypeXform({tag: "c:bubbleChart"}),
            "c:catAx" : new AxisXform({tag: "c:catAx"}),
            // dateAx
            "c:doughnutChart" : new ChartTypeXform({tag: "c:doughnutChart"}),
            // dTable, extLst
            "c:layout" : new LayoutXform(),
            "c:line3DChart" : new ChartTypeXform({tag: "c:line3DChart"}),
            "c:lineChart" : new ChartTypeXform({tag: "c:lineChart"}),
            "c:ofPieChart" : new OfPieChartXform(),
            "c:pie3DChart" : new ChartTypeXform({tag: "c:pie3DChart"}),
            "c:pieChart" : new ChartTypeXform({tag: "c:pieChart"}),
            "c:radarChart" : new ChartTypeXform({tag: "c:radarChart"}),
            "c:scatterChart" : new ChartTypeXform({tag: "c:scatterChart"}),
            "c:serAx" : new AxisXform({tag: "c:serAx"}),
            "c:spPr" : new ShapePropertiesXform({tag: "c:spPr"}),
            "c:stockChart" : new ChartTypeXform({tag: "c:stockChart"}),
            "c:surface3DChart" : new ChartTypeXform({tag: "c:surface3DChart"}),
            "c:surfaceChart" : new ChartTypeXform({tag: "c:surfaceChart"}),
            "c:valAx" : new AxisXform({tag: "c:valAx"}),
        };
        this.chartTypes = {
            area3DChart : {name: "area", isAreaChart: true, is3D: true},
            areaChart : {name: "area", isAreaChart: true},
            bar3DChart : {name: "bar", isBarChart: true, is3D: true, alternate: {name: "column", barDir: "col", isColumnChart: true, is3D: true}},
            barChart : {name: "bar", isBarChart: true, alternate: {name: "column", barDir: "col", isColumnChart: true}},
            bubbleChart: {name: "bubble", isBubbleChart: true},
            doughnutChart : {name: "pie", isPieChart: true, isDoughnutChart: true},
            line3DChart : {name: "line", isLineChart: true, is3D: true},
            lineChart : {name: "line", isLineChart: true},
            pie3DChart: {name: "pie", isPieChart: true, is3D: true},
            pieChart: {name: "pie", isPieChart: true},
            radarChart: {name: "radar", isRadarChart: true},
            scatterChart: {name: "scatter", isScatterChart: true},
        };
    }
    onParserClose(name, parser) {
        name = name.substring(name.indexOf(":") + 1);
        if (this.chartTypes[name]) {
            if (!this.model.chartTypes)
                this.model.chartTypes = [];
            let chartType = this.chartTypes[name];
            if (parser.model.barDir && chartType.alternate) {
                if (chartType.alternate.barDir === parser.model.barDir)
                    chartType = chartType.alternate;
            }
            if (parser.model.grouping) {
                if (parser.model.grouping === "clustered")
                    chartType.isClustered = true;
                else if (parser.model.grouping === "stacked")
                    chartType.isStacked = true;
            }
            this.model.chartTypes.push({type: chartType, model: parser.model});
        } else
            this.model[name] = parser.model;
        this.model.objectify = this.objectify;
    }

    objectify(chartObject) {
        const valueAxis = this.valAx ? this.valAx.objectify(chartObject, this.chartTypes[0]) : undefined;
        const categoryAxis = this.catAx ? this.catAx.objectify(chartObject, this.chartTypes[0]) : undefined;
        const seriesArray = [];
        let categories = undefined;
        this.chartTypes.forEach(chartType => {
            chartType.model.ser.forEach((s, index) => {
                const series = s.objectify(chartObject, chartType);
                if (series.series.name !== undefined && !series.series.name.length)
                    series.series.name = (index+1).toString();
                if (series.categories && !categories)
                    categories = series.categories;
                series.series.dataLabels = chartType.model.dLbls ? chartType.model.dLbls.objectify() : {enabled: false};
                seriesArray.push(series.series);
            });
        });
        if (categories) {
            categoryAxis.categories = categories.categories;
            if (categoryAxis.reversed && categories.categories.length === 1)
                categoryAxis.reversed = false;
            else if (this.valAx && this.valAx.axPos === "r" && this.chartTypes[0].type.isColumnChart)
                categoryAxis.reversed = true;
            categoryAxis.categoryRange = categories.rangeAddress;
        }
        return {yAxis: valueAxis, xAxis: categoryAxis, series: seriesArray, interior: this.spPr ? this.spPr.objectify(chartObject) : undefined};
    }
}

module.exports = PlotAreaXform;
