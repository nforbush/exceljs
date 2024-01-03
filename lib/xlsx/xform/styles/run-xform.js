const CompositeExtXform = require('../composite-ext-xform');
const StringXform = require('../simple/string-xform');

class RunXform extends CompositeExtXform {
    constructor() {
        super();

        // https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.wordprocessing.run?view=openxml-2.8.1
        this.tag = "a:r";
        this.isArrayList = ["t"];
        this.map = {
            // br, commentReference, contentPart, continuation, cr
            // daylong, dayShort, delInstrText, deltext
            // drawing, endnoteRef, endnoteReference, fldChar
            // footnodeRef, footnoteReference, instrText, lastRenderedPageBreak
            // monthLong, monthShort, noBreakHypen, object, pgNum, ptab
            // rPr
            // ruby, separator, softHyphen, sym
            "a:t" : new StringXform({tag: "a:t"}),
            // tab, yearLong, yearShort
        };
    }
    reconcile() {
        this.model.text = (this.model.t || []).join("");
    }
}
module.exports = RunXform;