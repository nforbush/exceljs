const CompositeExtXform = require('../composite-ext-xform');
const NvGraphicFramePrXform = require("./nv-graphic-frame-pr-xform");
const GraphicXform = require("../styles/graphic-xform");
const Transform2DXform = require("../styles/transform-2d-xform");

class GraphicFrameXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "xdr:graphicFrame";
        this.map = {
            "xdr:nvGraphicFramePr" : new NvGraphicFramePrXform(),
            "xdr:xfrm" : new Transform2DXform({tag: "xdr:xfrm"}),
            "a:graphic" : new GraphicXform(),
        }
    }

    // get tag() {
    //     return "xdr:graphicFrame";
    // }
    //
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
    //             this.model.nonVisualGraphicFrameProperties = this.map['xdr:nvGraphicFramePr'].model ? this.map['xdr:nvGraphicFramePr'].model : null;
    //             this.model.graphic = this.map['a:graphic'].model ? this.map['a:graphic'].model : null;
    //             return false;
    //         default:
    //             // could be some unrecognised tags
    //             return true;
    //     }
    // }
}
module.exports = GraphicFrameXform;