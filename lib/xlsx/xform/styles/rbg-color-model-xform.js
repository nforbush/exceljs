const IntegerXform = require("../simple/integer-xform");
const BooleanXform = require("../simple/boolean-xform");
const CompositeExtXform = require('../composite-ext-xform');
const Color = require("../../../doc/color");
const htmlUtils = require("../../../utils/html-utils");

class RgbColorModelHexXform extends CompositeExtXform {
    constructor(options) {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.rgbcolormodelhex?view=openxml-2.8.1
        this.tag = options.tag;
        this.map = {
            "a:alpha" : new IntegerXform({tag: "a:alpha", attr: "val"}),
            "a:alphaMod" : new IntegerXform({tag: "a:alphaMod", attr: "val"}),
            "a:alphaOff" : new IntegerXform({tag: "a:alphaMod", attr: "val"}),
            "a:blue" : new IntegerXform({tag: "a:blue", attr: "val"}),
            "a:blueMod" : new IntegerXform({tag: "a:alphaMod", attr: "val"}),
            "a:blueOff" : new IntegerXform({tag: "a:blueMod", attr: "val"}),
            "a:comp" : new BooleanXform({tag: "a:comp"}),
            "a:gamma" : new BooleanXform({tag: "a:gamma"}),
            "a:gray" : new IntegerXform({tag: "a:gray", attr: "val"}),
            "a:green" : new IntegerXform({tag: "a:green", attr: "val"}),
            "a:greenMod" : new IntegerXform({tag: "a:greenMod", attr: "val"}),
            "a:greenOff" : new IntegerXform({tag: "a:greenMod", attr: "val"}),
            "a:hue" : new IntegerXform({tag: "a:hue", attr: "val"}),
            "a:hueMod" : new IntegerXform({tag: "a:hueMod", attr: "val"}),
            "a:hueOff" : new IntegerXform({tag: "a:hueMod", attr: "val"}),
            "a:inv" : new BooleanXform({tag: "a:inv"}),
            "a:invGamma" : new BooleanXform({tag: "a:invGamma"}),
            "a:lum" : new IntegerXform({tag: "a:lum", attr: "val"}),
            "a:lumMod" : new IntegerXform({tag: "a:lumMod", attr: "val"}),
            "a:lumOff" : new IntegerXform({tag: "a:lumOff", attr: "val"}),
            "a:red" : new IntegerXform({tag: "a:red", attr: "val"}),
            "a:redMod" : new IntegerXform({tag: "a:redMod", attr: "val"}),
            "a:redOff" : new IntegerXform({tag: "a:redMod", attr: "val"}),
            "a:sat" : new IntegerXform({tag: "a:sat", attr: "val"}),
            "a:satMod" : new IntegerXform({tag: "a:satMod", attr: "val"}),
            "a:satOff" : new IntegerXform({tag: "a:satMod", attr: "val"}),
            "a:shade" : new IntegerXform({tag: "a:shade", attr: "val"}),
            "a:tint" : new IntegerXform({tag: "a:tint", attr: "val"}),
        };
    }
    reconcile() {
        let colorRaw = this.tag === "a:scrgbClr" ? htmlUtils.RGBToHex(this.model.attributes.r, this.model.attributes.g, this.model.attributes.b) : (this.model.attributes && this.model.attributes.val ? this.model.attributes.val : "");
        this.model.color = new Color(colorRaw, this.model.alpha, this.model.lumMod, this.model.lumOff);
    }
}

module.exports = RgbColorModelHexXform;