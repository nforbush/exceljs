const BooleanXform = require("../simple/boolean-xform");
const CompositeExtXform = require('../composite-ext-xform');
const ColorXform = require("./color-xform");
const GradientFillXform = require("./gradient-fill-xform");
const PatternFillXform = require("./pattern-fill-xform");
const FontXform = require("./font-xform");
const OutlineXform = require("./outline-xform");

class RunPropertiesXform extends CompositeExtXform {
    constructor(options) {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.defaultrunproperties?view=openxml-2.8.1
        this.tag = options.tag;
        this.map = {
            // blipFill
            "a:cs" : new FontXform({tag: "a:cs"}),
            "a:ea" : new FontXform({tag: "a:ea"}),
            // effectDat, effectLst,
            "a:gradFill" : new GradientFillXform(),
            "a:grpFill" : new BooleanXform({tag: "a:grpFill"}),
            // highlight, hlinkClick, hlinkMouseOver,
            "a:latin" : new FontXform({tag: "a:latin"}),
            "a:ln" : new OutlineXform(),
            "a:noFill" : new BooleanXform({tag: "a:noFill"}),
            "a:pattFill" : new PatternFillXform(),
            // rtl
            "a:solidFill" : new ColorXform({tag: "a:solidFill"}),
            // sym, uFill, uFillTx, uLn, UlnTx
        };
    }
}

module.exports = RunPropertiesXform;
