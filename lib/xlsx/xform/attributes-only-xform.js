const CompositeExtXform = require('./composite-ext-xform');

class AttributesOnlyXform extends CompositeExtXform {
    constructor(options) {
        super();

        this.tag = options.tag;
        this.map = {};  // just get attributes
    }
}

module.exports = AttributesOnlyXform;