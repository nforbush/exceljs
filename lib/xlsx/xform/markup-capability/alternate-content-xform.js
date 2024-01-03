const CompositeXform = require('../composite-xform');
const ChoiceXform = require("./choice-xform");
const FallbackXform = require("./fallback-xform");

class AlternateContentXform extends CompositeXform {
    constructor() {
        super();

        this.tag = "mc:AlternateContent";
        this.model = {};
        this.map = {
            "mc:Choice" : new ChoiceXform(),
            "mc:Fallback" : new FallbackXform(),
        };
    }
    onParserClose(name, parser) {
        name = name.substring(name.indexOf(":") + 1);
        this.model[name] = parser.model;
        this.model.reconcile = this.reconcile;
    }
}

module.exports = AlternateContentXform;
