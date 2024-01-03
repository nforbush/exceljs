const Range = require("./range.js");

class Shape {
    constructor(anchor) {
        const shape = anchor.sp;
        const shapeProperties = shape && shape.spPr ? shape.spPr : undefined;
        const nonVisualShapeProperties = shape && shape.nvSpPr ? shape.nvSpPr : undefined;
        const nonVisualDrawingProperties = nonVisualShapeProperties && nonVisualShapeProperties.cNvPr ? nonVisualShapeProperties.cNvPr : undefined;
        this.type = shapeProperties && shapeProperties.prstGeom && shapeProperties.prstGeom.attributes ? shapeProperties.prstGeom.attributes.prst : "";
        this.id = nonVisualDrawingProperties && nonVisualDrawingProperties.attributes ? nonVisualDrawingProperties.attributes.id : "";
        this.name = nonVisualDrawingProperties && nonVisualDrawingProperties.attributes ? nonVisualDrawingProperties.attributes.name : "";
        this.caption = shape && shape.txBody ? (shape.txBody.caption || "") : "";
        if (!this.caption && shape && shape.txBody && shape.txBody.p && shape.txBody.p.r) {
            shape.txBody.p.r.forEach(run => {
                this.caption += run.t;
            });
        }
        // if (!this.caption && shape && shape.txBody && shape.txBody.p && shape.txBody.p.fld)
        //     this.caption = shape.txBody.p.fld.t.join("");
        // if (!this.caption.length)
        //     console.log("shape.js");
        this.formulaTextbox = shape && shape.attributes.textlink ? (shape.attributes.textlink || null) : null;
        this.altText = nonVisualDrawingProperties && nonVisualDrawingProperties.attributes ? nonVisualDrawingProperties.attributes.descr : "";
        if (!anchor.range.br)
            anchor.range.br = {nativeCol: anchor.range.tl.nativeCol, nativeRow: anchor.range.tl.nativeRow};
        this.range = new Range(anchor.range.tl.nativeRow + 1, anchor.range.tl.nativeCol + 1, anchor.range.br.nativeRow + 1, anchor.range.br.nativeCol + 1);
    }
}

module.exports = Shape;