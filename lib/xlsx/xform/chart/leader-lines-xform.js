const CompositeExtXform = require('../composite-ext-xform');
const ShapePropertiesXform = require("../styles/shape-properties-xform");

class LeaderLinesXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.leaderlines?view=openxml-2.8.1
        this.tag = "c:leaderLines";
        this.map = {
            "c:spPr": new ShapePropertiesXform({tag: "c:spPr"}),
        };
    }
}

module.exports = LeaderLinesXform;
