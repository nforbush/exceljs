const CompositeExtXform = require('../composite-ext-xform');
const IntegerXform = require('../simple/integer-xform');
const FloatXform = require('../simple/float-xform');
const StringXform = require('../simple/string-xform');
const NumberingFormatXform = require('./numbering-format-xform');
const TitleXform = require('./title-xform');
const ScalingXform = require('./scaling-xform');
const GridlinesXform = require('./gridlines-xform');
const ShapePropertiesXform = require('../styles/shape-properties-xform');
const TextPropertiesXform = require('../styles/text-properties-xform');
const conversion = require('../../../utils/conversion');

class AxisXform extends CompositeExtXform {
    constructor(options) {
        super();

        this.tag = options.tag;
        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.seriesAxis?view=openxml-2.8.1
        this.map = {
            'c:auto' : new IntegerXform({tag: 'c:auto', attr: 'val'}),

            'c:axId' : new IntegerXform({tag: 'c:axId', attr: 'val'}),
            'c:axPos' : new StringXform({tag: 'c:axPos', attr: 'val'}),
            'c:crossAx' : new StringXform({tag: 'c:crossAx', attr: 'val'}),
            'c:crossBetween' : new StringXform({tag: 'c:crossBetween', attr: 'val'}),
            'c:crosses' : new StringXform({tag: 'c:crosses', attr: 'val'}),
            'c:crossesAt' : new FloatXform({tag: 'c:crossesAt', attr: 'val'}),
            'c:delete' : new IntegerXform({tag: 'c:delete', attr: 'val'}),
            // extLst

            "c:lblAlgn" : new StringXform({tag: "c:lblAlgn", attr: 'val'}),
            "c:lblOffset" : new IntegerXform({tag: "c:lblOffset", attr: 'val'}),

            "c:majorGridlines" : new GridlinesXform(),
            "c:majorTickMark" : new StringXform({tag: "c:majorTickMark", attr: 'val'}),
            "c:minorTickMark" : new StringXform({tag: "c:minorTickMark", attr: 'val'}),
            "c:minorGridlines" : new GridlinesXform(),
            "c:noMultiLvlLbl" : new StringXform({tag: "c:noMultiLvlLbl", attr: 'val'}),
            "c:numFmt" : new NumberingFormatXform(),
            "c:scaling" : new ScalingXform(),
            "c:spPr" : new ShapePropertiesXform({tag: "c:spPr"}),
            "c:title" : new TitleXform(),
            "c:tickLblPos" : new StringXform({tag: "c:tickLblPos", attr: 'val'}),
            "c:tickMarkSkip" : new IntegerXform({tag: "c:tickMarkSkip", attr: 'val'}),
            "c:txPr" : new TextPropertiesXform({tag: "c:txPr"}),
        };
        this.majorGridlines = undefined;
        this.majorTickMark = undefined;
        this.minorTickMark = undefined;
        this.title = undefined;
    }

    reconcile() {
        this.model.type = this.tag === "c:catAx" ? "category" : "value";
    }

    objectify(chartObject, chartType) {
        const properties = ["min", "max", "lineColor", "lineWidth", "gridLineWidth", "gridLineColor", "gridLineDashStyle",
            "tickWidth", "tickLength", "tickPosition", "tickColor",
            "minorTicks", "minorGridLineWidth", "minorGridLineColor", "minorGridLineDashStyle",
            "minorTickWidth", "minorTickLength", "minorTickPosition", "minorTickColor",
            "reversedStacks", "title", "categories", "categoryRange", "reversed", "labels"];
        const axis = {};
        properties.forEach(property => {
            axis[property] = undefined;
        });
        const majorGridlines = this.majorGridlines ? this.majorGridlines.objectify(chartObject) : undefined;
        axis.lineWidth = undefined;
        let noFill = false;
        if (this.spPr) {
            const shapeProperties = this.spPr;
            if (shapeProperties.ln) {
                if (shapeProperties.ln.widthInPx)
                    axis.lineWidth = shapeProperties.ln.widthInPx;
                if (shapeProperties.ln.solidFill) {
                    axis.lineColor = chartObject.resolveColor(shapeProperties.ln.solidFill.color, "000000");
                    axis.lineWidth = axis.lineWidth ? axis.lineWidth : 1;
                } else if (shapeProperties.ln.noFill) {
                    noFill = true;
                    axis.lineColor = undefined; // "#FFFFFF or #000000
                    axis.lineWidth = 0;
                }
            }
        }
        if (this.delete === 0 && !axis.lineColor && !noFill) {
            axis.lineColor = "#868686"; // TODO
            axis.lineWidth = axis.lineWidth ? axis.lineWidth : 1;
        }
        axis.gridLineWidth = majorGridlines ? conversion.ptToPx(majorGridlines.border.weight) : 0;
        axis.gridLineColor = majorGridlines ? majorGridlines.border.color : undefined;
        axis.gridLineDashStyle = majorGridlines ? majorGridlines.border.presetDash : undefined;
        axis.tickWidth = undefined;
        if (axis.lineWidth !== undefined) {
            if (this.majorTickMark === "out" || this.majorTickMark === "cross")
                axis.tickPosition = "outside";
            else if (this.majorTickMark === "in")
                axis.tickPosition = "inside";
            if (!axis.tickPosition)
                axis.tickWidth = 0;
            else {
                axis.tickWidth = 1;
                axis.tickLength = 5;
                axis.tickColor = axis.lineColor;
            }
        }
        // TODO minor tickmarks

        if (this.type === "value" && chartType.type.isStacked)
            axis.reversedStacks = false;
        axis.title = this.title ? this.title.objectify(chartObject) : {text: null};
        axis.labels = {enabled: false};
        if (this.delete === 0 && this.tickLblPos && this.tickLblPos !== "none") {
            let style = {color: "#000000", fontFamily: "Arial", fontSize: 12};
            if (this.txPr && this.txPr.p && this.txPr.p.pPr && this.txPr.p.pPr.defRPr)
                style = chartObject.mergeFonts(this.txPr.p.pPr.defRPr, undefined, true);
            axis.labels = {enabled: true, style: style, useHTML: false}; // TODO
        }
        if (this.type === "category")
            axis.reversed = chartType.type.hasOwnProperty("isBarChart");
        return axis;
    }
}


module.exports = AxisXform;
