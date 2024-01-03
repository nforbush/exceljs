const CompositeExtXform = require('../composite-ext-xform');
const AnchorXform = require("./anchor-xform");
class ControlPropertiesXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "controlPr";
        this.map = {
            anchor: new AnchorXform(),
        };
    }
}
module.exports = ControlPropertiesXform;
