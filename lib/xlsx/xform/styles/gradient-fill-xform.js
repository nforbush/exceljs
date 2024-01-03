const CompositeExtXform = require('../composite-ext-xform');
const AttributesOnlyXform = require("../attributes-only-xform");
const GradientStopListXform = require("./gradient-stop-list-xform");

class GradientFillXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.gradientfill?view=openxml-2.8.1
        this.tag = "a:gradFill";
        this.map = {
            "a:gsLst": new GradientStopListXform(),
            "a:lin": new AttributesOnlyXform({tag: "a:lin"}),
            // "a:path":
            // "a:tileRect":
        };
    }
}

module.exports = GradientFillXform;
