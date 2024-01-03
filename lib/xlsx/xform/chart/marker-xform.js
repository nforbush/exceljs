const CompositeExtXform = require('../composite-ext-xform');
const IntegerXform = require("../simple/integer-xform");
const StringXform = require("../simple/string-xform");
const ShapePropertiesXform = require("../styles/shape-properties-xform");
const conversion = require("../../../utils/conversion");

class MarkerXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.marker?view=openxml-2.8.1
        this.tag = "c:marker";
        this.map = {
            "c:size": new IntegerXform({tag: "c:size", attr: "val"}),
            "c:spPr" : new ShapePropertiesXform({tag: "c:spPr"}),
            "c:symbol": new StringXform({tag: "c:symbol", attr: "val"}),
        };
    }
    objectify(defaultColor) {
        // marker
        const marker = {enabled: false, states: undefined, symbol: undefined, radius: undefined, fillColor: undefined, lineColor: undefined};
        // https://learn.microsoft.com/en-us/openspecs/office_standards/ms-odrawxml/d7e41c18-0760-43fc-8b3c-cb8fc284560b
        const markerStyle = [{xl: "none", hc: "circle"}, {xl: "circle", hc: "circle"}, {xl: "dash", hc: "circle"}, {xl: "diamond", hc: "diamond"},
            {xl: "dot", hc: "circle"}, {xl: "plus", hc: "circle"}, {xl: "square", hc: "square"}, {xl: "star", hc: "circle"},
            {xl: "triangle", hc: "triangle"}, {xl: "x", hc: "circle"}];
        if (!this.symbol && this.attributes && this.attributes.val === "1")
            this.symbol = "triangle";
        else if (!this.symbol)
            this.symbol = "none";
        if (this.symbol !== "none")
            marker.enabled = true;
        if (marker.enabled) {
            let ms = [{hc: "circle"}];
            ms = markerStyle.filter(ms => ms.xl === this.symbol) || ms;
            marker.symbol = ms[0].hc || "circle";
            // radius
            let size = this.size ? this.size / 2 : conversion.pxToPt(5);
            marker.radius = conversion.ptToPx(size);
            // colors
            marker.fillColor = this.spPr && this.spPr.ln && this.spPr.ln.color ? this.spPr.ln.color.hexText : defaultColor;
            marker.lineColor = this.spPr && this.spPr.ln && this.spPr.ln.color ? this.spPr.ln.color.hexText : defaultColor;
        } else
            marker.states = {hover: {enabled: false}};
        return marker;
    }
}

module.exports = MarkerXform;