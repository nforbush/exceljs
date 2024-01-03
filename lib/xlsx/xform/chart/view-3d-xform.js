const CompositeExtXform = require('../composite-ext-xform');
const IntegerXform = require('../simple/integer-xform');
const BooleanXform = require('../simple/boolean-xform');

class View3DXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.view3d?view=openxml-2.7.2
        this.tag = "c:view3D";
        this.map = {
            "c:depthPercent" : new IntegerXform({tag: "c:depthPercent", attr: "val"}),
            // extLst
            "c:hPercent" : new IntegerXform({tag: "c:hPercent", attr: "val"}),  // height percent
            "c:perspective" : new IntegerXform({tag: "c:perspective", attr: "val"}),
            "c:rAngAx" : new BooleanXform({tag: "c:rAngAx", attr: "val"}),  // rightAngleAxis
            "c:rotX" : new IntegerXform({tag: "c:rotX", attr: "val"}),      // rotate x
            "c:rotY" : new IntegerXform({tag: "c:rotY", attr: "val"}),      // rotate y
        };
    }
}

module.exports = View3DXform;
