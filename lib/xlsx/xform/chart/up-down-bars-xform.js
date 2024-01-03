const CompositeExtXform = require('../composite-ext-xform');
const IntegerXform = require("../simple/integer-xform");
const LinesBarsXform = require("./lines-bars-xform");

class UpDownBarsXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "c:upDownBars";
        this.map = {
            "c:downBars" : new LinesBarsXform({tag: "c:downBars"}),
            // extlst
            "c:gapWidth" : new IntegerXform({tag: "c:gapWidth", attr: "val"}),
            "c:upBars" : new LinesBarsXform({tag: "c:upBars"}),
        };
    }
}

module.exports = UpDownBarsXform;
