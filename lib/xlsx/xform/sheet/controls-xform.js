const CompositeExtXform = require('../composite-ext-xform');
const AlternateContentControlsXform = require("./alternate-content-controls-xform");
class ControlsXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "controls";
        this.isArrayList = ["AlternateContent"];
        this.map = {
            "mc:AlternateContent" : new AlternateContentControlsXform(),
        };
    }
    reconcile() {
        this.model.control = [];
        this.model.AlternateContent.forEach(content => {
            this.model.control.push(content.Choice.control);
        });
    }

}
module.exports = ControlsXform;
