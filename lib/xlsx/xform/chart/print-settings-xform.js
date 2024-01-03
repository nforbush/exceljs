const CompositeExtXform = require('../composite-ext-xform');
const PageMarginsXform = require("./page-margins-xform");

class PrintSettingsXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.printsettings?view=openxml-2.8.1
        this.tag = "c:printSettings";
        this.map = {
            // headerFooter
            "c:pageMargins" : new PageMarginsXform(),
            // pageSetup
        };
    }
}

module.exports = PrintSettingsXform;
