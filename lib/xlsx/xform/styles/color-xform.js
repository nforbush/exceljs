const CompositeExtXform = require('../composite-ext-xform');
const RgbColorModelXform = require("./rbg-color-model-xform");

class ColorXform extends CompositeExtXform {
    constructor(options) {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.customcolor?view=openxml-2.8.1
        this.tag = options.tag;
        this.map = {
            "a:hslClr" : new RgbColorModelXform({tag: "a:hslClr"}),
            "a:prstClr" : new RgbColorModelXform({tag: "a:prstClr"}),
            "a:schemeClr" : new RgbColorModelXform({tag: "a:schemeClr"}),
            "a:scrgbClr" : new RgbColorModelXform({tag: "a:scrgbClr"}),
            "a:srgbClr" : new RgbColorModelXform({tag: "a:srgbClr"}),
            "a:sysClr" : new RgbColorModelXform({tag: "a:sysClr"}),
        };
    }
    reconcile() {
        let model = {};
        Object.entries(this.map).every(([key, value]) => {
            if (this.model[key.substring(key.indexOf(":")+1)]) {
                // should only be 1?
                model = value.model;
                return false;
            }
            return true;
        });
        this.model.color = model.color;
    }
}

module.exports = ColorXform;
