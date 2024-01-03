const Range = require("../../../doc/range");
const CompositeExtXform = require('../composite-ext-xform');
const IntegerXform = require('../simple/integer-xform');
//const BooleanXform = require('../simple/boolean-xform');
const DataPointXform = require('./data-point-xform');
const CategoryXform = require('./category-xform');
const ValuesXform = require('./values-xform');
const SeriesTextXform = require("./series-text-xform");
const ShapeXform = require("../styles/shape-style-xform");
const ShapePropertiesXform = require("../styles/shape-properties-xform");
const MarkerXform = require("./marker-xform");
const DataLabelsXform = require("./data-labels-xform");
const PictureOptionsXform = require("./picture-options-xform");
const ErrorBarsXform = require("./error-bars-xform");
const TrendlineXform = require("./trendline-xform");

class SeriesXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.barchartseries?view=openxml-2.8.1
        this.tag = "c:ser";
        this.isArrayList = ["dPt"];
        this.map = {
            "c:cat" : new CategoryXform(),
            "c:dLbls" : new DataLabelsXform(),
            "c:dPt" : new DataPointXform(),
            "c:errBars" : new ErrorBarsXform(),
            // extLst
            "c:idx" : new IntegerXform({tag: "c:idx", attr: "val"}),
            "c:invertIfNegative" : new IntegerXform({tag: "c:invertIfNegative", attr: "val"}),
            "c:marker" : new MarkerXform(),
            "c:order" : new IntegerXform({tag: "c:order", attr: "val"}),
            "c:pictureOptions" : new PictureOptionsXform(),
            "c:smooth" : new IntegerXform({tag: "c:smooth", attr: "val"}),
            "c:sp" : new ShapeXform({tag: "c:sp"}),
            "c:spPr" : new ShapePropertiesXform({tag: "c:spPr"}),
            "c:trendline" : new TrendlineXform(),
            "c:tx" : new SeriesTextXform(),
            "c:val" : new ValuesXform(),
        };
    }

    objectify(chartObject, chartType) {
        const properties = ["type", "innerSize", "name", "nameCell", "yAxis", "invertIfNegative", "color", "fillColor", "colors", "stacking",
                            "lineColor", "lineWidth", "marker", "states", "showInLegend", "yValues", "xValues", "data", "dataLabels"];
        const series = {};
        properties.forEach(property => series[property] = undefined);
        let categories = undefined;
        series.type = chartType.type.name;

        const text = this.tx && this.tx.strRef ? this.tx.strRef : undefined;
        if (chartType.type.isDoughnutChart)
            series.innerSize = chartType.model.holeSize ? parseInt(chartType.model.holeSize) + "%" : "0%";
        series.name = text && text.strCache && text.strCache.pt ? text.strCache.pt[0].html : "";
        if (text) {
            const formula = chartObject.topLeftCell.worksheet.workbook.parseFormula(text.f, chartObject.topLeftCell, null, true);
            const range = new Range(formula);
            const cell = chartObject.topLeftCell.worksheet.workbook.getWorksheet(range.sheetName || chartObject.topLeftCell.worksheet.name).getRow(range.top).getCell(range.left);
            series.nameCell = {objectFormat: cell.addressFullRowColCells};
        }

        series.invertIfNegative = this.invertIfNegative || false;

        if (chartType.type.isBarChart || chartType.type.isColumnChart || chartType.type.isLineChart || chartType.type.isAreaChart) {
            const shapeProperties = this.spPr;
            if (chartType.type.isBarChart || chartType.type.isColumnChart)
                series.color = shapeProperties && shapeProperties.solidFill ? chartObject.resolveColor(shapeProperties.solidFill.color) : undefined;
            else if (chartType.type.isLineChart || chartType.type.isAreaChart || chartType.type.isScatterChart) {
                if (chartType.type.isLineChart)
                    series.color = shapeProperties && shapeProperties.ln && shapeProperties.ln.solidFill ? chartObject.resolveColor(shapeProperties.ln.solidFill.color, chartObject.font.color) : chartObject.font.color;
                else if (chartType.type.isAreaChart)
                    series.fillColor = shapeProperties && shapeProperties.solidFill ? chartObject.resolveColor(shapeProperties.solidFill.color, "FFFFFF") : chartObject.font.color;
                if (!chartType.type.isAreaChart) {
                    if (chartType.type.isLineChart)
                        series.lineColor = undefined; // TODO
                } else {
                    series.lineColor = undefined; // TODO
                }
                series.lineWidth = shapeProperties && shapeProperties.ln ? (shapeProperties.ln.widthInPx || (chartType.type.isAreaChart ? 0 : 3)) : (chartType.type.isAreaChart ? 0 : 3);
                if (this.marker)
                    series.marker = this.marker.objectify(series.color);
                else
                    series.marker = {enabled: false, states:{ hover: {enabled: false}}};
                // else if (chartType.model.marker)
                //     series.marker = chartType.model.marker.objectify(series.color);
            }
            if (chartType.type.isAreaChart)
                series.states = {hover:{lineWidthPlus:0}};
        }
        if (chartType.type.isColumnChart && chartType.type.isStacked)
                series.stacking = "normal";
        const valData = this.val ? this.val : null;

        if (chartType.type.isPieChart) {
            series.colors = [];
            const numPoints = valData && valData.numRef ? valData.numRef.numCache.ptCount : 0;
            const dataPoints = numPoints ? [].concat(this.dPt.slice(0, numPoints)) : [];
            dataPoints.forEach(point => {
                series.colors.push(point.spPr && point.spPr.solidFill ? chartObject.resolveColor(point.spPr.solidFill.color, "000000") : chartObject.font.color);
            });
        }
        series.showInLegend = chartObject.chartSpace.chart.hasLegend;   // TODO

        // adjust formula for deleting columns
        valData.formula = chartObject.topLeftCell.worksheet.workbook.parseFormula(valData.numRef.f, chartObject.topLeftCell, null, true);
        const yValues = valData && valData.numRef ? new Range(valData.formula) : null;
        series.yValues = yValues ? {objectFormat: yValues.addressRange(chartObject.topLeftCell.worksheet.workbook)} : null;

        // adjust formula for deleting columns
        const calData = this.cat;
        if (calData) {
            const formula = calData.strRef ? calData.strRef.f : (calData.numRef ? calData.numRef.f : undefined);
            calData.formula = formula ? chartObject.topLeftCell.worksheet.workbook.parseFormula(formula, chartObject.topLeftCell, null, true) : undefined;
        }

        if (chartType.type.isPieChart) {
            const xValues = this.cat && calData.formula ? new Range(calData.formula) : null;
            series.xValues = xValues ? {objectFormat: xValues.addressRange(chartObject.topLeftCell.worksheet.workbook)} : undefined;
        }

        let cats = calData && calData.strRef && calData.strRef.strCache ? [].concat(calData.strRef.strCache.pt) : [];
        let categoryValues = false;
        if (!cats.length) {
            cats = calData && calData.numRef && calData.numRef.numCache ? [].concat(calData.numRef.numCache.pt) : [];
            if (calData)
                calData.formula = calData.numRef ? chartObject.topLeftCell.worksheet.workbook.parseFormula(calData.numRef.f, chartObject.topLeftCell, null, true) : undefined;
            categoryValues = true;
        }
        if ((chartType.type.isBarChart || chartType.type.isColumnChart || chartType.type.isLineChart || chartType.type.isAreaChart) && cats) {
            const _cats = [];
            cats.forEach(category => {
                if (categoryValues)
                    category.html = Number(category.html).toFixed(1);
                _cats.push(category.html);
            });
            const range = calData.formula ? new Range(calData.formula) : null;
            const rangeAddress = range ? {objectFormat: range.addressRange(chartObject.topLeftCell.worksheet.workbook)} : null;
            categories = {categories: _cats, rangeAddress: rangeAddress};
        }

        const points = this.val ? [].concat(valData.numRef.numCache.pt) : [];
        series.data = [];
        points.forEach((point, index) => {
            let numDigits = 4;
            if (this.val && this.val.numRef) {
                const numRef = this.val.numRef;
                if (numRef.numCache && numRef.numCache.formatCode) {
                    let format = numRef.numCache.formatCode;
                    const codes = format.split(";");
                    const index = codes[0].indexOf(".");
                    if (index >= 0) {
                        const decimals = codes[0].substring(index+1);
                        numDigits = decimals.match(/0/g).length;
                        if (codes[0].includes("%"))
                            numDigits += 2;
                    }
                }
            }
            const dataObj = {};
            // name
            if (chartType.type.isPieChart)
                dataObj.name = cats[index] && cats[index].html ? cats[index].html : index.toString();
            // y
            dataObj.y = Number(parseFloat(point.v).toFixed(numDigits));
            // color
            // TODO if point has shapeProperties
            if (chartType.type.isBarChart || chartType.type.isColumnChart)
                dataObj.color = series.color;
            else if (chartType.type.isAreaChart) {
                const shapeProperties = this.spPr;
                dataObj.color = chartObject.resolveColor(shapeProperties.solidFill.color, "FFFFFF");
            } else if (chartType.type.isLineChart)
                dataObj.color = "#FFFFFF";    // TODO
            // data labels
            dataObj.dataLabels = {enabled: false};
            if (chartType.type.isBarChart || chartType.type.isColumnChart || chartType.type.isLineChart || chartType.type.isAreaChart) {
                if (this.dLbls && this.dLbls.dLbl && this.dLbls.dLbl[index]) {
                    dataObj.dataLabels = this.dLbls.dLbl[index].objectify(chartObject);
                }
            }
            series.data.push(dataObj);
        });
        series.dataLabels = {enabled: false};
        return {series: series, categories: categories};
    }
}

module.exports = SeriesXform;
