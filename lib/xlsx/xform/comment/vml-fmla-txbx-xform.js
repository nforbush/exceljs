const BaseXform = require('../base-xform');

class VmlFmlaTxbxXform extends BaseXform {
    constructor() {
        super();
        this.model = {text: ''};
    }

    get tag() {
        return 'x:FmlaTxbx';
    }

    parseOpen(node) {
        switch (node.name) {
            case this.tag:
                this.model = {text: ''};
                return true;
            default:
                return false;
        }
    }

    parseText(text) {
        this.model.text = text;
    }

    parseClose() {
        return false;
    }
}

module.exports = VmlFmlaTxbxXform;
