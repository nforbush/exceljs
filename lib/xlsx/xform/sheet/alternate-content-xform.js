const CompositeExtXform = require('../composite-ext-xform');
const ChoiceXform = require("./choice-xform");
class AlternateContentXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "mc:AlternateContent";
        this.map = {
            "mc:Choice": new ChoiceXform(),
        }
        this.Choice = undefined;
    }
    reconcile() {
        this.model.controls = this.model.Choice.controls.control;
    }

}
module.exports = AlternateContentXform;