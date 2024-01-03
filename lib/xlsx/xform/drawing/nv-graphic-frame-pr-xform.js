const CompositeExtXform = require('../composite-ext-xform');
const CNvPrXform = require("./c-nv-pr-xform");
class NvGraphicFramePrXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = 'xdr:nvGraphicFramePr';
        this.map = {
            "xdr:cNvPr" : new CNvPrXform(),
        }
    }
    // get tag() {
    //     return 'xdr:nvGraphicFramePr';
    // }
    // parseOpen(node) {
    //     if (this.parser) {
    //         this.parser.parseOpen(node);
    //         return true;
    //     }
    //     switch (node.name) {
    //         case this.tag:
    //             this.reset();
    //             this.model = {};
    //             break;
    //         default:
    //             this.parser = this.map[node.name];
    //             if (this.parser) {
    //                 this.parser.parseOpen(node);
    //             }
    //             break;
    //     }
    //     return true;
    // }
    //
    // parseText(text) {
    //     if (this.parser)
    //         this.parser.parseText(text);
    // }
    //
    // parseClose(name) {
    //     if (this.parser) {
    //         if (!this.parser.parseClose(name)) {
    //             this.parser = undefined;
    //         }
    //         return true;
    //     }
    //     switch (name) {
    //         case this.tag:
    //             this.model.nonVisualDrawingProperties = this.map["xdr:cNvPr"].model ? this.map["xdr:cNvPr"].model : null;
    //             return false;
    //         default:
    //             // could be some unrecognised tags
    //             return true;
    //     }
    // }
}
module.exports = NvGraphicFramePrXform;