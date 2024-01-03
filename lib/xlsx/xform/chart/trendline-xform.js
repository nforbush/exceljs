const CompositeExtXform = require('../composite-ext-xform');
const IntegerXform = require('../simple/integer-xform');
const StringXform = require('../simple/string-xform');
const FloatXform = require('../simple/float-xform');
const BooleanXform = require('../simple/boolean-xform');
const ShapePropertiesXform = require("../styles/shape-properties-xform");
const TrendlineLabelXform = require("./trendline-label-xform");

class TrendlineXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "c:trendline";
        this.map = {
            "c:backward" : new FloatXform({tag: "c:backward", attr: "val"}),
            "c:dispEq" : new BooleanXform({tag: "c:dispEq", attr: "val"}),      // display equation
            "c:dispRSqr" : new BooleanXform({tag: "c:dispRSqr", attr: "val"}),      // display rsqaured value
            // extLst
            "c:forward" : new FloatXform({tag: "c:forward", attr: "val"}),
            "c:intercept" : new FloatXform({tag: "c:intercept", attr: "val"}),
            "c:name" : new StringXform({tag: "c:name"}),    // trendline name
            "c:order" : new IntegerXform({tag: "c:order", attr: "val"}),
            "c:period" : new IntegerXform({tag: "c:period", attr: "val"}),
            "c:spPr" : new ShapePropertiesXform({tag: "c:spPr"}),
            "c:trendlineLbl" : new TrendlineLabelXform(),
            "c:trendlineType" : new StringXform({tag: "c:trendlineType", attr: "val"}),
        };
    }
}

module.exports = TrendlineXform;
