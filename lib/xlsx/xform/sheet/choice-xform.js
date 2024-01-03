const CompositeExtXform = require('../composite-ext-xform');
const ControlsXform = require("./controls-xform");

class ChoiceXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "mc:Choice";
        this.map = {
            "controls" : new ControlsXform(),
        };
    }
}

module.exports = ChoiceXform;
