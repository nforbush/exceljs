const CompositeExtXform = require('../composite-ext-xform');
const IntegerXform = require('../simple/integer-xform');
const BooleanXform = require('../simple/boolean-xform');
const ShapePropertiesXform = require('../styles/shape-properties-xform');
const PictureOptionsXform = require("./picture-options-xform");

class DataPointXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.datapoint?view=openxml-2.8.1
        this.tag = "c:dPt";
        this.map = {
            "c:bubble3D" : new BooleanXform({tag: "c:bubble3D", attr: "val"}),
            "c:explosion" : new IntegerXform({tag: "c:explosion", attr: "val"}),
            // extLst
            "c:idx" : new IntegerXform({tag: "c:idx", attr: "val"}),
            "c:invertIfNegative" : new IntegerXform({tag: "c:invertIfNegative", attr: "val"}),
            "c:pictureOptions" : new PictureOptionsXform(),
            "c:spPr" : new ShapePropertiesXform({tag: "c:spPr"}),
        };
    }
}

module.exports = DataPointXform;
