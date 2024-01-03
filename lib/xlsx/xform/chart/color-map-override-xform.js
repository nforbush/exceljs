const CompositeExtXform = require('../composite-ext-xform');

class ColorMapOverrideXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "c:clrMapOvr";
        this.map = {};
    }
}

module.exports = ColorMapOverrideXform;
