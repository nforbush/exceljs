class Control {
    constructor(ctrlProp, control, shape, shapeMatch, index) {
        this.objectType = ctrlProp.objectType;
        this.id = control.attributes.shapeId;
        this.name = control.attributes.name;
        this.caption = shapeMatch ? shapeMatch.caption : "";
        // this.caption = shape ? shape.caption : "";
        // this.caption = shape ? shape.caption.replace(/\n\s*/, " ") : "";
        this.formulaTextbox = shape ? (shape.formulaTextbox || null)  : null;
        this.altText = control.controlPr.attributes ? control.controlPr.attributes.altText : undefined;
        this.range = control.controlPr.anchor.range; // new Range(control.controlPr.anchor.from.range.tl.nativeRow+1, control.controlPr.anchor.from.range.tl.nativeCol+1, control.controlPr.anchor.to.range.br.nativeRow+1, control.controlPr.anchor.to.range.br.nativeCol+1);
        this.index = index;

        if (this.objectType === "CheckBox" || this.objectType === "Radio") {
            this.checked = ctrlProp.checked === "Checked" ? true : 0;
            this.formulaLink = ctrlProp.fmlaLink || "";
        }
        if (this.objectType === "Radio") {
            if (ctrlProp.firstButton) {
                this.firstButton = parseInt(ctrlProp.firstButton);
            }
            this.groupBox = null; // for now
        }
        this.shape = shapeMatch;
    }
}

module.exports = Control;