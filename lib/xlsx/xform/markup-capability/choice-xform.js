const CompositeXform = require('../composite-xform');
const IntegerXform = require("../simple/integer-xform");

class ChoiceXform extends CompositeXform {
    constructor() {
        super();

        this.tag = "mc:Choice";
        this.map = {};
    }
    createNewModel(node) {
        let tagName = "c:style";
        const requires = node.attributes.Requires;
        if (requires)
            tagName = requires + ":style";
        this.map[tagName] = new IntegerXform({tag: tagName, attr: "val"});
        return {};
    }

    onParserClose(name, parser) {
        name = name.substring(name.indexOf(":") + 1);
        this.model[name] = parser.model;
        this.model.reconcile = this.reconcile;
    }
}

module.exports = ChoiceXform;
