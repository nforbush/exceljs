const Range = require("../../../doc/range");
const CompositeExtXform = require('../composite-ext-xform');
const IntegerXform = require("../simple/integer-xform");
const ChartTextXform = require("./chart-text-xform");
const TextPropertiesXform = require("../styles/text-properties-xform");
const LayoutXform = require("./layout-xform");
const ShapePropertiesXform = require("../styles/shape-properties-xform");

class TitleXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.title?view=openxml-2.8.1
        this.tag = "c:title";
        this.map = {
            // extlst
            "c:layout" : new LayoutXform(),
            "c:overlay" : new IntegerXform({tag: "c:overlay", attr: "val"}),
            "c:spPr" : new ShapePropertiesXform({tag: "c:spPr"}),
            "c:tx" : new ChartTextXform(),
            "c:txPr" : new TextPropertiesXform({tag: "c:txPr"}),
        };
        this.tx = undefined;
    }
    objectify(chartObject) {
        const title = {text: undefined, titleCell : undefined, align: undefined, verticalAlign: undefined, x: undefined, y: undefined, style: undefined, floating: undefined, useHTML: undefined};

        let titleCell = null;
        let text = undefined;
        let textProperties = undefined;
        if (this.tx.strRef) {
            text = this.tx.strRef;
            if (text && text.f) {
                const formula = chartObject.topLeftCell.worksheet.workbook.parseFormula(text.f, chartObject.topLeftCell, null, true);
                const range = new Range(formula);
                titleCell = chartObject.topLeftCell.worksheet.workbook.getWorksheet(range.sheetName).getCell(range.tl);
            }
            title.text = text && text.strCache && text.strCache.ptCount > 0 ? text.strCache.pt[0].html : undefined;
            textProperties = this.txPr ? this.txPr : undefined;
        } else if (this.tx.rich) {
            text = this.tx.rich;
            title.text = text && text.p && text.p.r ? text.p.r[0].text : undefined;
            textProperties = text;
        }

        title.style = textProperties && textProperties.p ? chartObject.mergeFonts(textProperties.p.pPr.defRPr, {fontWeight: "bold"}, true) : chartObject.font;
        if (textProperties && textProperties.p && textProperties.p.pPr && textProperties.p.pPr.defRPr && textProperties.p.pPr.defRPr.solidFill)
            title.style.color = chartObject.resolveColor(textProperties.p.pPr.defRPr.solidFill.color, "000000");
        else
            title.style.color = chartObject.font.color;
        if (this.layout && this.layout.manualLayout) {
            title.align = "center";
            // title.x = conversion.ptToPx(this.layout.manualLayout.x);
            // title.y = conversion.ptToPx(this.layout.manualLayout.y);
            // if (title.y === 0)
            //     title.y = undefined;
        } else
            title.align = textProperties.alignment ? textProperties.alignment.horizontal : undefined;
        title.align = title.align || "center";

        title.titleCell = titleCell ? {objectFormat: titleCell.addressFullRowColCells} : undefined;
//        title.floating = this.overlay === 1;
        title.useHTML = title.text ? title.text.includes("<br>") : undefined;

        return title;

    }
}

module.exports = TitleXform;
