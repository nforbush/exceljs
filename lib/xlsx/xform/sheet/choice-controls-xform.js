const CompositeExtXform = require('../composite-ext-xform');
const ControlXform = require("./control-xform");

class ChoiceControlsXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "mc:Choice";
        this.map = {
            "control" : new ControlXform(),
        };
    }
}

module.exports = ChoiceControlsXform;
