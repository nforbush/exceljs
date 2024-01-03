const CompositeExtXform = require('../composite-ext-xform');
const IntegerXform = require('../simple/integer-xform');
const StringXform = require('../simple/string-xform');
const TitleXform = require('./title-xform');
const TextPropertiesXform = require('../styles/text-properties-xform');
const ShapePropertiesXform = require('../styles/shape-properties-xform');
const LayoutXform = require("./layout-xform");
const conversion = require("../../../utils/conversion");

class LegendXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "c:legend";
        this.map = {
            "c:title" : new TitleXform(),
            "c:txPr" : new TextPropertiesXform({tag: "c:txPr"}),
            "c:spPr" : new ShapePropertiesXform({tag: "c:spPr"}),
            "c:legendPos" : new StringXform({tag: "c:legendPos", attr: "val"}),
            "c:layout" : new LayoutXform(),
            "c:overlay" : new IntegerXform({tag: "c:overlay", attr: "val"}),
        };
        this.title = undefined;
        this.txPr = undefined;
        this.spPr = undefined;
        this.legendPos = undefined;
        this.layout = undefined;
        this.overlay = undefined;
    }
    objectify(chartObject, data) {
        const legend = {enabled: chartObject.chartSpace.chart.hasLegend};
        if (legend.enabled) {
            let valign = "middle";
            let align = "right";
            let layout = undefined;
            let y = 0;
            let doWidth = false;
            switch (this.legendPos) {
                case "b":
                    valign = "bottom";
                    align = "center";
                    break;
                case "t":
                    valign = "top";
                    align = "center";
                    y = conversion.ptToPx(this.top) - 10;    // 10 is default spacing top
                    break;
                case "r":
                    valign = "middle";
                    align = "right";
                    layout = "vertical";
                    doWidth = true;
                    break;
                case "l":
                    valign = "middle";
                    align = "left";
                    layout = "vertical";
                    doWidth = true;
                    break;
                case "c":
                    valign = "middle";
                    align = "right";
                    layout = "vertical";
                    doWidth = true;
                    break;
            }
            legend.verticalAlign = valign;
            legend.align = align;
            legend.layout = layout;
            const textProperties = this.txPr;
            this.font = textProperties ? chartObject.mergeFonts(textProperties.p.pPr, {fontWeight: "none"}, true) : chartObject.mergeFonts(undefined, {fontWeight: "none"}, true);
            // https://csharp.hotexamples.com/examples/DocumentFormat.OpenXml.Drawing.Charts/Width/-/php-width-class-examples.html
            if (doWidth) {
                if (this.layout && this.layout.manualLayout)
                    legend.width = Math.round(chartObject.width * this.layout.manualLayout.w);
                else {
                    let width = 0;
                    const pctWidth = 0.34;
                    const maxWidth = Math.round(chartObject.width * pctWidth);
                    const minWidth = 20; // this is the spacing etc.
                    (data || [0]).forEach(data => {
                        // legend width when not specified is dependent on min width of name or 34%
                        const px = conversion.pxWidth(data.name, {font: this.font.fontFamily, size: this.font.fontSize});
                        width = Math.max(Math.min(Math.floor(px) + minWidth, maxWidth), width);
                    });
                    if (chartObject.info.legendWidth && chartObject.info.legendWidth > 0 && width !== chartObject.info.legendWidth)
                        width = chartObject.info.legendWidth; // override with what provided
                    legend.width = width;
                }
            }
            legend.itemWidth = doWidth ? legend.width - 8 : undefined;    // 8 is default padding
            legend.itemStyle = {
                width: legend.itemWidth,
                color: this.font.color,
                fontFamily: this.font.fontFamily,
                fontSize: this.font.fontSize,
                fontWeight: this.font.fontWeight ? this.font.fontWeight : "none",
                textOverflow: null,
            };
            legend.useHTML = false;
            legend.symbolHeight = undefined;
            legend.symbolRadius = 0;
            legend.y = y ? y : undefined;
        }
        return legend;
    }
}

module.exports = LegendXform;
