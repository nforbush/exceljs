const CompositeExtXform = require('../composite-ext-xform');
const conversion = require("../../../utils/conversion");

class NumberingFormatXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.numberingformat?view=openxml-2.8.1
        this.tag = "c:numFmt";
        this.map = {};
    }
    reconcile() {
        this.model.numberFormat = undefined;
        this.model.numberFormatLocale = undefined;
        if (this.model.attributes && this.model.attributes.formatCode && this.model.attributes.formatCode !== "General") {
            const pairs = [{regexp: /\$-409/g, replace: "$-en-US"}];
            this.model.numberFormat = conversion.convertToJavaScriptString(this.model.attributes.formatCode);
            this.model.numberFormatLocale = this.model.numberFormat;
            pairs.forEach(pair => {
               this.model.numberFormatLocale = this.model.numberFormatLocale.replace(pair.regexp, pair.replace);
            });
        }
    }
}

module.exports = NumberingFormatXform;
