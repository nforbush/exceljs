const CompositeExtXform = require('../composite-ext-xform');
const IntegerXform = require('../simple/integer-xform');
const ShapePropertiesXform = require("../styles/shape-properties-xform");
const PictureOptionsXform = require("./picture-options-xform");

class FloorWallXform extends CompositeExtXform {
    constructor(options) {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.floor?view=openxml-2.7.2
        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.backwall?view=openxml-2.7.2
        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.sidewall?view=openxml-2.7.2
        this.tag = options.tag;
        this.map = {
            // extLst
            "c:autoTitleDeleted" : new IntegerXform({tag: "c:autoTitleDeleted", attr: "val"}),  // floor
            "c:pictureOptions" : new PictureOptionsXform(),
            "c:spPr" : new ShapePropertiesXform({tag: "c:spPr"}),
            "c:thickness" : new IntegerXform({tag: "c:thickness", attr: "val"}),
        };
    }
}

module.exports = FloorWallXform;
