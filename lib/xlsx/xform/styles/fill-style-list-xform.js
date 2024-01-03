const BooleanXform = require("../simple/boolean-xform");
const CompositeExtXform = require('../composite-ext-xform');
const ColorXform = require("./color-xform");
const GradientFillXform = require("../styles/gradient-fill-xform");
const PatternFillXform = require("../styles/pattern-fill-xform");

class FillStyleListXform extends CompositeExtXform {
    constructor(options) {
        super();

        this.tag = options.tag;
        this.map = {
            // "a:blipFill"
            "a:gradFill" : new GradientFillXform(),
            "a:grpFill" : new BooleanXform({tag: "a:grpFill"}),
            "a:noFill" : new BooleanXform({tag: "a:noFill"}),
            "a:pattFill" : new PatternFillXform(),
            "a:solidFill" : new ColorXform({tag: "a:solidFill"}),
        };
    }
    onParserClose(name, parser) {
        name = name.substring(name.indexOf(":") + 1);
        if (name === "solidFill") {
            if (!this.model[name])
                this.model[name] = [];
            this.model[name].push(parser.model);
        } else
            this.model[name] = parser.model;
    }
}

module.exports = FillStyleListXform;
