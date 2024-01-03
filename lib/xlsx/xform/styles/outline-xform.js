const FillXform = require("../style/fill-xform");
const CompositeExtXform = require('../composite-ext-xform');
const StringXform = require('../simple/string-xform');
const IntegerXform = require('../simple/integer-xform');
const BooleanXform = require('../simple/boolean-xform');
// const ExtensionListXform = require("./extension-list-xform");
const ColorXform = require("./color-xform");
const GradientFillXform = require("./gradient-fill-xform");
const PatternFillXform = require("./pattern-fill-xform");
const conversion = require("../../../utils/conversion");

class OutlineXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.outline?view=openxml-2.8.1
        this.tag = "a:ln";
        this.map = {
            // bevel, custDash,
            // "a:extLst" : new ExtensionListXform(),
            "a:gradFill" : new GradientFillXform(),
            // headEnd
            "a:miter" : new IntegerXform({tag: "a:miter", attr: "lim"}),
            "a:fill" : new FillXform(),
            "a:noFill" : new BooleanXform({tag: "a:noFill"}),
            "a:pattFill" : new PatternFillXform(),
            "a:prstDash" : new StringXform({tag: "a:prstDash", attr: "val"}),
            // round
            "a:solidFill" : new ColorXform({tag: "a:solidFill"}),
            // "tailEnd"
        };
    }
    reconcile() {
        // https://api.highcharts.com/class-reference/Highcharts#.DashStyleValue
        // https://learn.microsoft.com/en-us/openspecs/office_standards/ms-docx/82325e66-8510-43a9-af4f-6c8970502474
        const dashStyles = {
            solid: "Solid",
            dot: "Dot",
            sysDot: "SmallDot",
            dash: "Dash",
            sysDash: "Dash",
            lgDash: "LongDash",
            dashDot: "DashDot",
            sysDashDot: "DashDot",
            lgDashDot: "LongDashDot",
            lgDashDotDot: "LongDashDotDot",
            sysDashDotDot: "DashDotDot"
        };
        this.model.widthRaw = this.model.attributes ? this.model.attributes.w : undefined;
        this.model.widthInPt = this.model.widthRaw ? Math.round(((this.model.widthRaw / 10000 * 0.7874) + Number.EPSILON) * 100) / 100 : undefined;
        this.model.widthInPx = this.model.widthInPt ? conversion.ptToPx(this.model.widthInPt) : undefined;
        this.model.capsType = this.model.cap || "square";
        this.model.compoundLineType = this.model.cmpd || "sng";
        this.model.presetDash = dashStyles[this.model.prstDash || "solid"] || "Solid";
        this.model.color = this.model.solidFill ? this.model.solidFill.color : undefined;
    }

    objectify(chartObject) {
        return {
            borderColor: this.noFill ? "#FFFFFF" : chartObject.resolveColor(this.color, "FFFFFF"),
            borderWidth: this.noFill || !this.prstDash ? 0 : (this.widthInPx || 1),
        };
    }
}

module.exports = OutlineXform;
