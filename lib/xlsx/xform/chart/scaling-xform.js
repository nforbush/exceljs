const CompositeExtXform = require('../composite-ext-xform');
const StringXform = require('../simple/string-xform');
const FloatXform = require('../simple/float-xform');
const IntegerXform = require('../simple/integer-xform');

class ScalingXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.scaling?view=openxml-2.8.1
        this.tag = "c:scaling";
        this.map = {
            // extLst
            "a:logBase" : new FloatXform({tag: "c:logBase", attr: "val"}),
            "a:max" : new IntegerXform({tag: "c:max", attr: "val"}),
            "a:min" : new IntegerXform({tag: "c:min", attr: "val"}),
            "a:orientation" : new StringXform({tag: "c:orientation", attr: "val"}),
        };
    }
}

module.exports = ScalingXform;
