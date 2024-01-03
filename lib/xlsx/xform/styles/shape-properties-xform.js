const BooleanXform = require('../simple/boolean-xform');
const CompositeExtXform = require('../composite-ext-xform');
const OutlineXform = require("./outline-xform");
const GradientFillXform = require("./gradient-fill-xform");
const PatternFillXform = require("./pattern-fill-xform");
const ColorXform = require("./color-xform");
const Transform2DXform = require("./transform-2d-xform");
const PresetGeometryXform = require("./preset-geometry-xform");
// const ExtensionListXform = require('./extension-list-xform');

class ShapePropertiesXform extends CompositeExtXform {
    constructor(options) {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.pictures.shapeproperties?view=openxml-2.8.1
        this.tag = options.tag;
        this.map = {
            // "a:blipFill"
            // "a:custGeom"
            // "a:effectDrag"
            // "a:effectLst"
            // "a:extLst" : new ExtensionListXform(),
            "a:gradFill" : new GradientFillXform(),
            "a:grpFill" : new BooleanXform({tag: "a:grpFill"}),
            "a:ln" : new OutlineXform(),
            "a:noFill" : new BooleanXform({tag: "a:noFill"}),
            "a:pattFill" : new PatternFillXform(),
            "a:prstGeom" : new PresetGeometryXform(),
            // a:scene3d
            "a:solidFill" : new ColorXform({tag: "a:solidFill"}),
            // a:sp3d
            "a:xfrm" : new Transform2DXform({tag: "a:xfrm"}),
        };
    }

    reconcile() {
        this.model.color = this.model.solidFill ? this.model.solidFill.color : undefined;
    }

    objectify(chartObject) {
        return {
            color: this.noFill || !this.color ? "none" : chartObject.resolveColor(this.color, "none"),
            border: this.ln ? this.ln.objectify(chartObject) : undefined,
        };
    }
}

module.exports = ShapePropertiesXform;
