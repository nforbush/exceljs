const CompositeXform = require('./composite-xform');
class CompositeExtXform extends CompositeXform {
    createNewModel(node) {
        const model = {};
        Object.entries(node.attributes).forEach(([key, value]) => {
            if (!model.attributes)
                model.attributes = {};
            if (key.includes(":"))
                key = key.replace(":", "");
            model.attributes[key] = value;
        });
        if (this.objectify)
            model.objectify = this.objectify;
        return model;
    }

    onParserClose(name, parser) {
        if (name.indexOf(":") > 0)
            name = name.substring(name.indexOf(":") + 1);
        if (this.isArrayList && this.isArrayList.includes(name)) {
            if (!this.model[name])
                this.model[name] = [];
            this.model[name].push(parser.model);
        } else
            this.model[name] = parser.model;
        if (this.objectify)
            this.model.objectify = this.objectify;
    }

    parseClose(name) {
        // Default implementation
        if (this.parser) {
            if (!this.parser.parseClose(name)) {
                this.onParserClose(name, this.parser);
                this.parser = undefined;
            }
            return true;
        }
        if (name === this.tag)
            this.reconcile(this.model);

        return name !== this.tag;
    }
}

module.exports = CompositeExtXform;