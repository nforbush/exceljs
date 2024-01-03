const ListXform = require('../list-xform');
class ListExtXform extends ListXform {
    constructor(options) {
        super(options);
    }
    onParserClose(name, parser) {
        name = name.substring(name.indexOf(":") + 1);
        this.model[name] = parser.model;
    }

    parseClose(name) {
        if (this.parser) {
            if (!this.parser.parseClose(name)) {
                this.onParserClose(name, this.parser);
                this.model.push(this.parser.model);
                this.parser = undefined;

                if (this.maxItems && this.model.length > this.maxItems) {
                    throw new Error(`Max ${this.childXform.tag} count (${this.maxItems}) exceeded`);
                }
            }
            return true;
        }

        return false;
    }
}

module.exports = ListExtXform;