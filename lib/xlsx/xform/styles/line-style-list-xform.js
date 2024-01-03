const CompositeXform = require('../composite-xform');
const OutlineXform = require("./outline-xform");

class LineStyleListXform extends CompositeXform {
    constructor() {
        super();

        this.tag = "a:lnStyleLst";
        this.isArrayList = ["ln"];
        this.map = {
            "a:ln" : new OutlineXform(),
        };
    }
}

module.exports = LineStyleListXform;
