const CompositeExtXform = require('../composite-ext-xform');
const AttributesOnlyXform = require('../attributes-only-xform');

class Transform2dXform extends CompositeExtXform {
    constructor(options) {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.transform2d?view=openxml-2.8.1
        this.tag = options.tag;
        this.map = {
            "a:ext" : new AttributesOnlyXform({tag: "a:ext"}),
            "a:off" : new AttributesOnlyXform({tag: "a:off"}),
        };
    }
}

module.exports = Transform2dXform;
