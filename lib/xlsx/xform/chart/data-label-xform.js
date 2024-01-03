const CompositeExtXform = require('../composite-ext-xform');
const IntegerXform = require('../simple/integer-xform');
const StringXform = require("../simple/string-xform");
const NumberingFormatXform = require("./numbering-format-xform");
const ShapePropertiesXform = require("../styles/shape-properties-xform");
const ChartTextXform = require("./chart-text-xform");
const TextPropertiesXform = require("../styles/text-properties-xform");
const LayoutXform = require("./layout-xform");

class DataLabelXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.datalabel?view=openxml-2.8.1
        this.tag = "c:dLbl";
        this.map = {
            "c:delete" : new IntegerXform({tag: "c:delete", attr: "val"}),
            "c:dLblPos" : new IntegerXform({tag: "c:dLblPos", attr: "val"}),
            "c:idx": new IntegerXform({tag: "c:idx", attr: "val"}),
            "c:layout" : new LayoutXform(),
            "c:numFmt" : new NumberingFormatXform(),
            "c:separator" : new StringXform({tag: "c:separator", attr: "val"}),
            "c:showBubbleSize" : new IntegerXform({tag: "c:showBubbleSize", attr: "val"}),
            "c:showCatName" : new IntegerXform({tag: "c:showCatName", attr: "val"}),
            "c:showLeaderLines" : new IntegerXform({tag: "c:showLeaderLines", attr: "val"}),
            "c:showLegendKey" : new IntegerXform({tag: "c:showLegendKey", attr: "val"}),
            "c:showPercent" : new IntegerXform({tag: "c:showPercent", attr: "val"}),
            "c:showSerName" : new IntegerXform({tag: "c:showSerName", attr: "val"}),
            "c:showVal" : new IntegerXform({tag: "c:showVal", attr: "val"}),
            "c:spPr" : new ShapePropertiesXform({tag: "c:spPr"}),
            "c:tx" : new ChartTextXform(),
            "c:txPr" : new TextPropertiesXform({tag: "c:txPr"}),
        };
    }

    objectify(chartObject, dataLabels) {
        const dataLabel = dataLabels ? dataLabels : this;
        const nodeTags = ["showSerName", "showPercent", "showVal", "showCatName"];
        let format = "";
        const formats = ["{series.name}", "{point.dlformattedpct}", "{point.dlformatted}", "{point.name}"];
        formats.forEach((fmt, index) => {
            if (dataLabel[nodeTags[index]] === 1)
                format += ((format.length ? ", " : "") + fmt);
        });
        const dL = {enabled: false};
        if (format.length) {
            dL.enabled = true;
            dL.align = "center";
            dL.format = format;
            dL.numberFormat = this.numFmt ? this.numFmt.numberFormatLocale : undefined;
            const properties = this.txPr && this.txPr.p && this.txPr.p.pPr && this.txPr.p.pPr.defRPr ? this.txPr.p.pPr.defRPr : undefined;
            if (properties)
                dL.style = chartObject.mergeFonts(properties, undefined, true);
        }
        return dL;
    }
}

module.exports = DataLabelXform;
