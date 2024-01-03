const CompositeExtXform = require('../composite-ext-xform');

class FontXform extends CompositeExtXform {
    constructor(options) {
        super();

        this.tag = options.tag;
        this.map = {};
    }
    createNewModel(node) {
        return {
            typeface: node.attributes.typeface || "",
            panose: node.attributes.panose || "",
            pitchFamily: node.attributes.pitchFamily ? parseInt(node.attributes.pitchFamily, 10) : undefined,
            charset: node.attributes.charset ? parseInt(node.attributes.charset || 0, 10) : undefined,
        };
    }
}

module.exports = FontXform;
