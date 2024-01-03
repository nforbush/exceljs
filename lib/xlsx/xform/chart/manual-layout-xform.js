const CompositeExtXform = require('../composite-ext-xform');
const FloatXform = require('../simple/float-xform');
const StringXform = require('../simple/string-xform');

class ManualLayoutXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.manuallayout?view=openxml-2.8.1
        this.tag = "c:manualLayout";
        this.map = {
            "c:h" : new FloatXform({tag: "c:h", attr: "val"}),
            "c:hMode" : new StringXform({tag: "c:hMode", attr: "val"}),
            "c:layoutTarget" : new StringXform({tag: "c:layoutTarget", attr: "val"}),
            "c:w" : new FloatXform({tag: "c:w", attr: "val"}),
            "c:wMode" : new StringXform({tag: "c:wMode", attr: "val"}),
            "c:x" : new FloatXform({tag: "c:x", attr: "val"}),
            "c:xMode" : new StringXform({tag: "c:xMode", attr: "val"}),
            "c:y" : new FloatXform({tag: "c:y", attr: "val"}),
            "c:yMode" : new StringXform({tag: "c:yMode", attr: "val"}),
        };
    }
}

module.exports = ManualLayoutXform;
