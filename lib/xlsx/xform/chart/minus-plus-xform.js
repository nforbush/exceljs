const CompositeExtXform = require('../composite-ext-xform');
const NumberLiteralXform = require("./number-literal-xform");
const NumberReferenceXform = require("./number-reference-xform");

class MinusPlusXform extends CompositeExtXform {
    constructor(options) {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.minus?view=openxml-2.8.1
        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.plus?view=openxml-2.8.1
        this.tag = options.tag;
        this.map = {
            "c:numLit" : new NumberLiteralXform(),
            "c:numRef" : new NumberReferenceXform(),
        };
    }
}

module.exports = MinusPlusXform;
