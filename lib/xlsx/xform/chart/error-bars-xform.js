const CompositeExtXform = require('../composite-ext-xform');
const BooleanXform = require('../simple/boolean-xform');
const StringXform = require('../simple/string-xform');
const ValuesXform = require('./values-xform');
const ShapePropertiesXform = require("../styles/shape-properties-xform");
const MinusPlusXform = require("./minus-plus-xform");

class ErrorBarsXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.errorbars?view=openxml-2.8.1
        this.tag = "c:errBars";
        this.map = {
            "c:errBarType" : new StringXform({tag: "c:errBarType", attr: "val"}),
            "c:errDir" : new StringXform({tag: "c:errDir", attr: "val"}),
            "c:errValType" : new StringXform({tag: "c:errValType", attr: "val"}),
            // extLst
            "c:minus" : new MinusPlusXform({tag: "c:minus"}),
            "c:noEndCap" : new BooleanXform({tag: "c:noEndCap", attr: "val"}),
            "c:plus" : new MinusPlusXform({tag: "c:plus"}),
            "c:spPr" : new ShapePropertiesXform({tag: "c:spPr"}),
            "c:val" : new ValuesXform(),
        };
    }
}

module.exports = ErrorBarsXform;
