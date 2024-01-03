const CompositeExtXform = require('../composite-ext-xform');
const ChoiceDrawingXform = require("./choice-drawing-xform");
class AlternateContentDrawingXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "mc:AlternateContent";
        this.map = {
            "mc:Choice": new ChoiceDrawingXform(),
        }
    }
}
module.exports = AlternateContentDrawingXform;