const Range = require("./range");
const Color = require("./color");
const conversion = require("../utils/conversion");

class ChartObject {
    constructor(anchor, sheetName, options) {
        if (!anchor || !anchor.graphicFrame.graphic.graphicData.chart)
            return;
        this.id = anchor.graphicFrame.nvGraphicFramePr.cNvPr.attributes.id;
        this.name = anchor.graphicFrame.nvGraphicFramePr.cNvPr.attributes.name;
        this.topLeftCell = null;
        this.rId = anchor.graphicFrame.graphic.graphicData.chart.attributes.rid;
        this.range = new Range(anchor.range.tl.nativeRow + 1, anchor.range.tl.nativeCol + 1, anchor.range.br.nativeRow + 1, anchor.range.br.nativeCol + 1, sheetName);
        this.anchor = anchor;

        this.chartSpace = options.charts[anchor.graphicFrame.chart.name];
        // c:printSettings
        this.theme = [];
        this.colors = undefined;
        this.style = undefined;
        this.info = {width: undefined, height: undefined, legendWidth: undefined};
        this.theme.push(options.themes["theme1"]);
        if (anchor.graphicFrame.chart.theme)
            this.theme.push(options.themes[anchor.graphicFrame.chart.theme]);
        if (anchor.graphicFrame.chart.colors)
            this.colors = options.chartColors[anchor.graphicFrame.chart.colors];
        if (anchor.graphicFrame.chart.style)
            this.style = options.chartStyles[anchor.graphicFrame.chart.style];
    }

    get width() {
        let width = 0;
        for (let number = this.range.left + 1; number < this.range.right; number++) {
            const col = this.topLeftCell.worksheet.getColumn(number);
            if (!col.hidden)
                width += col.width;
        }
        const multiplier =  conversion.pxToPt(7); // 5.25013125; // best guess is 7 pixel width of Arial converted to px
        width *= multiplier;
        const offsetColFirst = (this.topLeftCell.worksheet.getColumn(this.range.left).width * multiplier) - conversion.EmuToPt(this.anchor.range.tl.nativeColOff);
        const offsetColLast = conversion.EmuToPt(this.anchor.range.br.nativeColOff);
        width = conversion.ptToPx(offsetColFirst + width + offsetColLast);
        if (this.info.width && this.info.width > 0 && width !== this.info.width)
            width = this.info.width; // override with what provided
        return width;
    }
    get height() {
        // if (this.name === "CFCostChart")
        //     console.log("height");
        //  height in pixels
        let height = 0.0;
        const offsetRowFirst = (this.topLeftCell.worksheet.getRow(this.anchor.range.tl.nativeRow + 1).height || 12.75) - conversion.EmuToPt(this.anchor.range.tl.nativeRowOff);
        for (let number = this.anchor.range.tl.nativeRow + 2; number < this.anchor.range.br.nativeRow + 1; number++) {
            const row = this.topLeftCell.worksheet.getRow(number);
            if (!row.hidden) {
                let rowHeight = (row.hasOwnProperty("height") ? row.height : 12.75);
                const rhInteger = Math.floor(rowHeight);
                const rhRemainder = rowHeight % 1;
                const rhDecimal = rhRemainder < 0.25 ? 0 : (rhRemainder < 0.5 ? 0.25 : (rhRemainder < 0.75 ? 0.5 : 0.75));
                rowHeight = rhInteger + rhDecimal;
                height += rowHeight;
            }
        }
        const offsetRowLast = conversion.EmuToPt(this.anchor.range.br.nativeRowOff);
        // console.log(this.name + ":" + this.topLeftCell.worksheet.getRow(this.anchor.range.tl.nativeRow+1).height + ":" + this.anchor.range.tl.nativeRow + ":" + this.anchor.range.br.nativeRow  + ":" + this.anchor.range.tl.nativeRowOff + ":" + this.anchor.range.br.nativeRowOff);
        // console.log(this.name + ":" + offsetRowFirst + ":" + height + ":" + offsetRowLast + ":" + (offsetRowFirst + height + offsetRowLast) + ":" + conversion.ptToPx(offsetRowFirst + height + offsetRowLast));
        height = conversion.ptToPx(offsetRowFirst + height + offsetRowLast);
        if (this.info.height && this.info.height > 0 && height !== this.info.height)
            height = this.info.height; // override with what provided
        return height;
    }
    resolveColor(colorModel, defaultColorModel) {
        if (colorModel && colorModel.isTheme)
            colorModel = this.findThemeColor(colorModel);
        if ((!colorModel || !colorModel.text) && defaultColorModel) {
            if (typeof defaultColorModel === "string")
                defaultColorModel = new Color(defaultColorModel);
            if (defaultColorModel.isTheme)
                defaultColorModel = this.findThemeColor(defaultColorModel);
            colorModel = defaultColorModel;
        }
        return colorModel.text;
    }
    findThemeColor(colorModel) {
        if (!colorModel.theme)
            return colorModel;
        const themeMap = {bg1: "lt1", tx1: "dk1", bg2: "lt2", tx2: "lt2"};
//        const themeMap = {bg1: "dk1", tx1: "lt1", bg2: "lt2", tx2: "lt2"};
        const colorScheme = this.theme[0].themeElements.clrScheme;
        let themeModel = colorScheme ? colorScheme[colorModel.theme] : undefined;
        if (colorScheme && !themeModel && themeMap[colorModel.theme])
            themeModel = colorScheme[themeMap[colorModel.theme]];
        if (!themeModel && this.theme[1]) {
            const colorSchemeMatch = Object.entries(this.theme[1].clrScheme).filter(([key, value]) => {
                return value.color === colorModel.theme;
            })[0];
            if (colorSchemeMatch)
                themeModel = colorSchemeMatch[1].model;
        }
        if (themeModel)
            colorModel = new Color(themeModel.color.hex, colorModel.alpha || themeModel.color.alpha, colorModel.lumMod || themeModel.color.lumMod, colorModel.lumOff || themeModel.color.lumOff);
        return colorModel;
    }
    mergeFonts(properties, overrideFont, convertToPx) {
        let font = {color: "#000000", fontFamily: "Arial", fontSize: 9, fontWeight: undefined, fontStyle: undefined, textDecoration: undefined, textOverflow: undefined};
        const defaultFont = this.font || {};
        if (typeof overrideFont === "object") {
            Object.entries(overrideFont).forEach(([key, value]) => {
                defaultFont[key] = value;
            });
        }
        if (!properties) {
            if (convertToPx)
                defaultFont.fontSize = conversion.ptToPx(defaultFont.fontSize);
            return defaultFont;
        }
        font.color = properties.solidFill ? this.resolveColor(properties.solidFill.color, defaultFont.color) : (defaultFont.color || font.color);
        const fontObj = properties.latin ? properties.latin : (properties.ea ? properties.ea : (properties.cs ? properties.cs: undefined));
        font.fontFamily = fontObj ? fontObj.typeface : (defaultFont.fontFamily || font.fontFamily);
        const familyToArial = ["+mn-lt"];
        if (familyToArial.includes(font.fontFamily))
            font.fontFamily = "Arial";
        let sz = properties.attributes && properties.attributes.sz ? properties.attributes.sz : undefined;
        font.fontSize = sz ? parseFloat(sz) / 100 : (defaultFont.fontSize || font.fontSize);
        if (convertToPx)
            font.fontSize = conversion.ptToPx(font.fontSize);
        font.fontWeight = defaultFont.fontWeight || font.fontWeight;
        if (properties.attributes && properties.attributes.b)
            font.fontWeight = properties.attributes.b === "1" ? "bold" : undefined;
        if (properties.attributes && properties.attributes.i)
            font.fontStyle = properties.attributes.i === "1" ? "italic" : undefined;
        if (properties.attributes && properties.attributes.u)
            font.textDecoration = properties.attributes.u === "1" ? "underline" : undefined;
        if (properties.attributes && properties.attributes.strike)
            font.textDecoration = properties.attributes.strike === "1" ? "line-through" : undefined;
        return font;
    }
    renderObj() {
        if (!this.topLeftCell)
            return "";

        const chartObject = {};
        const properties = ["chart", "title", "legend", "plotOptions", "tooltip", "yAxis", "xAxis", "series", "exporting", "credits", "updateOptions"];
        properties.forEach(property => chartObject[property] = undefined);

        this.font = this.mergeFonts(this.chartSpace.txPr);
        this.info = this.topLeftCell.getInfo("chart");

        const chart = this.chartSpace.chart.objectify(this);
        chartObject.chart = chart.chart;
        chartObject.title = chart.title;
        chartObject.legend = chart.legend;
        chartObject.plotOptions = {series: {animation:true}};
        chartObject.tooltip = {enabled: true, useHTML: true};
        chartObject.yAxis = chart.plotArea.yAxis;
        if (chartObject.yAxis && (chartObject.chart.type && chartObject.chart.type !== "column" && chartObject.chart.type !== "line"))
            chartObject.yAxis.reversedStacks = undefined;
        if (this.chartSpace.chart.plotArea.chartTypes[0].type.isLineChart)
            chartObject.yAxis.reversedStacks = undefined;
        if (this.chartSpace.chart.plotArea.chartTypes[0].type.isAreaChart)
            chartObject.yAxis.reversedStacks = false;

        chartObject.xAxis = chart.plotArea.xAxis;
        // if (chartObject.xAxis)
        //     chartObject.xAxis.categories = plotArea.categories ? plotArea.categories : undefined;
        chartObject.series = chart.plotArea.series;

        chartObject.exporting = {buttons: {contextButton: {enabled: false}}};
        chartObject.credits = {enabled: false};
        let chartOptions = this.topLeftCell.colData[0].xml.getAttribute("options");
        if (chartOptions) {
            if (chartOptions.substring(chartOptions.length-1) !== ";")
                chartOptions += ";";
            const lines = chartOptions.split(";");
            lines.forEach(line => {
                const indexOf = line.indexOf("(");
                if (indexOf >= 1)
                    this.topLeftCell.worksheet.workbook.putFunction(line.substring(0, indexOf), false);
            });
            chartObject.updateOptions = {objectFormat: "function(){" + chartOptions + "}"};
        }

        return "charts.push(new ChartObject(" + conversion.objectToString(chartObject) + "));";
    }
}

module.exports = ChartObject;