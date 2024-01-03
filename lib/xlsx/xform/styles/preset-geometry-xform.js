const CompositeExtXform = require('../composite-ext-xform');

class PresetGeometryXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.presetgeometry?view=openxml-2.8.1
        this.tag = "a:prstGeom";
        this.map = {
            // avLst
        };
    }
}

module.exports = PresetGeometryXform;

