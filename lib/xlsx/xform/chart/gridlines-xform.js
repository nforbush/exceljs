const CompositeExtXform = require('../composite-ext-xform');
const ShapePropertiesXform = require('../styles/shape-properties-xform');

class GridlinesXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "c:majorGridlines";
        this.map = {
            "c:spPr" : new ShapePropertiesXform({tag: "c:spPr"}),
        };
        this.spPr = undefined;
    }
    objectify(chartObject) {
        let shapeProperties = undefined;
        if (this.spPr) {
            shapeProperties = this.spPr;
            const colorModel = shapeProperties ? shapeProperties.ln.solidFill.color : undefined;
            if (shapeProperties) {
                shapeProperties.border = {
                    weight: 1,
                    color: chartObject.resolveColor(colorModel, "lt2"),
                    presetDash: shapeProperties.ln ? shapeProperties.ln.presetDash : undefined,
                };
            }
        }
        return shapeProperties;
    }
}

module.exports = GridlinesXform;
