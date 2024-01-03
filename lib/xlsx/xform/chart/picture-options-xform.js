const CompositeExtXform = require('../composite-ext-xform');
const IntegerXform = require('../simple/integer-xform');
const FloatXform = require('../simple/float-xform');
const BooleanXform = require('../simple/boolean-xform');

class PictureOptionsXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.pictureOptions?view=openxml-2.7.2
        this.tag = "c:pictureOptions";
        this.map = {
            "c:applyToEnd" : new BooleanXform({tag: "c:applyToEnd", attr: "val"}),
            "c:applyToFront" : new BooleanXform({tag: "c:applyToFront", attr: "val"}),
            "c:applyToSides" : new BooleanXform({tag: "c:applyToSides", attr: "val"}),
            "c:pictureFormat" : new IntegerXform({tag: "c:pictureFormat", attr: "val"}),
            "c:pictureStackUnit" : new FloatXform({tag: "c:pictureStackUnit", attr: "val"}),
        };
    }
}

module.exports = PictureOptionsXform;
