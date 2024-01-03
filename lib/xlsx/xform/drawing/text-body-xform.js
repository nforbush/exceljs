const CompositeExtXform = require('../composite-ext-xform');
const ParagraphXform = require("../styles/paragraph-xform");

class TextBodyXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.spreadsheet.textbody?view=openxml-2.8.1
        this.tag = "xdr:txBody";
        this.map = {
            "a:p" : new ParagraphXform(),
        };
    }
}
module.exports = TextBodyXform;