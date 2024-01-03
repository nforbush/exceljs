const CompositeExtXform = require('../composite-ext-xform');
const StringXform = require('../simple/string-xform');
const conversion = require("../../../utils/conversion");

class StringPointXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "c:pt";
        this.map = {
            "c:v" : new StringXform({tag: "c:v"}),
        };
    }

    reconcile() {
        this.model.html = conversion.convertToHtmlString(this.model.v) || undefined;
    }
}

module.exports = StringPointXform;
