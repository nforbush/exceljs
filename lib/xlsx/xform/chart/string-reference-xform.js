const CompositeExtXform = require('../composite-ext-xform');
const StringXform = require('../simple/string-xform');
const StringCacheXform = require("./string-cache-xform");

class StringReferenceXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "c:strRef";
        this.map = {
            "c:strCache" : new StringCacheXform(),
            "c:f" : new StringXform({tag: "c:f"}),
        };
    }
}

module.exports = StringReferenceXform;
