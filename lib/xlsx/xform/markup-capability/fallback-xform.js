const CompositeXform = require('../composite-xform');
const IntegerXform = require("../simple/integer-xform");

class FallbackXform extends CompositeXform {
    constructor() {
        super();

        this.tag = "mc:Fallback";
        this.map = {
            "c:style" : new IntegerXform({tag: "c:style", attr: "val"}),
        };
    }

    onParserClose(name, parser) {
        name = name.substring(name.indexOf(":") + 1);
        this.model[name] = parser.model;
        this.model.reconcile = this.reconcile;
    }
}

module.exports = FallbackXform;
