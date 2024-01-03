const CompositeExtXform = require('../composite-ext-xform');

class ModulationEffectXform extends CompositeExtXform {
    constructor(options) {
        super();

        // https://learn.microsoft.com/ka-ge/dotnet/api/documentformat.openxml.drawing.alphamodulationeffect?view=openxml-2.8.1
        this.tag = options.tag;
        this.map = {
            "a:cont" : new EffectContainerXform({tag: "a:cont", attr: "val"}),
        };
    }
}

module.exports = ModulationEffectXform;
