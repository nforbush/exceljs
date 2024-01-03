const CompositeExtXform = require('../composite-ext-xform');
const ControlPropertiesXform = require("./control-properties-xform");
class ControlXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "control";
        this.map = {
            controlPr : new ControlPropertiesXform(),
        };
    }
}
module.exports = ControlXform;
