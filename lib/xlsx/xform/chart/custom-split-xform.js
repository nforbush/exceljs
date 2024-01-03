const CompositeExtXform = require('../composite-ext-xform');
const IntegerXform = require('../simple/integer-xform');

class CustomSplitXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.customSplit?view=openxml-2.8.1
        this.tag = "c:custSplit";
        this.map = {
            "c:secondPiePt" : new IntegerXform({tag: "c:secondPiePt", attr: "val"}),
        };
    }
}

module.exports = CustomSplitXform;
