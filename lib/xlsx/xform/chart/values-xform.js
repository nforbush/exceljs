const CompositeExtXform = require('../composite-ext-xform');
const NumberReferenceXform = require('./number-reference-xform');

class ValuesXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.values?view=openxml-2.8.1
        this.tag = "c:val";
        this.map = {
            // numLit
            "c:numRef" : new NumberReferenceXform(),
        };
        this.numRef = undefined;
    }
}

module.exports = ValuesXform;
