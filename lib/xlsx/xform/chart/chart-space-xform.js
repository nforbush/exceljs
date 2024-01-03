const CompositeExtXform = require('../composite-ext-xform');
const IntegerXform = require('../simple/integer-xform');
const StringXform = require('../simple/string-xform');
const ChartXform = require("./chart-xform");
const TextPropertiesXform = require("../styles/text-properties-xform");
const ShapePropertiesXform = require("../styles/shape-properties-xform");
const AlternateContentXform = require("../markup-capability/alternate-content-xform");
const ColorMapOverrideXform = require("./color-map-override-xform");
const PrintSettingsXform = require("./print-settings-xform");

class ChartSpaceXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.charts.chartspace?view=openxml-2.8.1
        this.tag = "c:chartSpace";
        this.map = {
            "c:chart" : new ChartXform(),
            "c:clrMapOvr" : new ColorMapOverrideXform(),
            "c:date1904" : new IntegerXform({tag: "c:date1904", attr: "val"}),
            // c:externalData
            // c:extLst
            "c:lang" : new StringXform({tag: "c:lang", attr: "val"}),
            // c:pivotSource
            "c:printSettings": new PrintSettingsXform(),
            // c:protection
            "c:roundedCorners" : new IntegerXform({tag: "c:roundedCorners", attr: "val"}),
            "mc:AlternateContent" : new AlternateContentXform(),
            "c:spPr" : new ShapePropertiesXform({tag: "c:spPr"}),
            // style
            "c:txPr" : new TextPropertiesXform({tag: "c:txPr"}),
            // c:userShapes
        };
    }
}

module.exports = ChartSpaceXform;
