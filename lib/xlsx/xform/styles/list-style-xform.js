const CompositeExtXform = require('../composite-ext-xform');
const ParagraphPropertiesXform = require('./paragraph-properties-xform');
// const RunPropertiesXform = require('./run-properties-xform');

class ListStyleXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "a:lstStyle";
        this.map = {
            "a:defPPr" : new ParagraphPropertiesXform({tag: "a:defPPr"}),
            // extLst, lvl1pPr -> lvl9pPr
            // "a:defRPr" : new RunPropertiesXform({tag: "a:defRPr"}),
        };
    }
}

module.exports = ListStyleXform;
