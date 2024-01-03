const CompositeExtXform = require('../composite-ext-xform');
const ManualLayoutXform = require("./manual-layout-xform");

class LayoutXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.layout?view=openxml-2.8.1
        this.tag = "c:layout";
        this.map = {
            "c:manualLayout" : new ManualLayoutXform(),
        };
    }
}

module.exports = LayoutXform;
