const CompositeExtXform = require('../composite-ext-xform');
const NumberReferenceXform = require('./number-reference-xform');
const StringReferenceXform = require('./string-reference-xform');

class CategoryXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "c:cat";
        this.map = {
            "c:numRef" : new NumberReferenceXform(),
            "c:strRef" : new StringReferenceXform(),
        };
        // this.strRef = undefined;
    }
}

module.exports = CategoryXform;
