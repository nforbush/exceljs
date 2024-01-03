const CompositeExtXform = require('../composite-ext-xform');
const FloatXform = require('../simple/float-xform');

class NumericPointXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "c:pt";
        this.map = {
            "c:v": new FloatXform({tag: "c:v"}),
        };
    }
}
module.exports = NumericPointXform;
