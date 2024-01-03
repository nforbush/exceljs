const CompositeExtXform = require('../composite-ext-xform');
const ChoiceControlsXform = require("./choice-controls-xform");
class AlternateContentControlsXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "mc:AlternateContent";
        this.map = {
            "mc:Choice" : new ChoiceControlsXform(),
        }
    }
}
module.exports = AlternateContentControlsXform;