const CompositeExtXform = require('../composite-ext-xform');

class PageMarginsXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.wordprocessing.pagemargin?view=openxml-2.8.1
        this.tag = "c:pageMargins";
        this.map = {};
    }
}

module.exports = PageMarginsXform;