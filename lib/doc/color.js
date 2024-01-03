const htmlUtils = require("../utils/html-utils");

class Color {
    constructor(colorRaw, alpha, lumMod, lumOff) {
        colorRaw = colorRaw.replace(/^#/, "");

        this.alpha = alpha;
        this.lumMod = lumMod;
        this.lumOff = lumOff;
        this.opacity = alpha ? alpha/100000 : undefined;

        const regex = /^[0-9a-f]{6}/i;
        const match = regex.test(colorRaw);
        if (match) {
            if (!this.opacity || this.opacity <= 0)
                this.isHex = true;
            else
                this.isRGB = true;

            if (lumMod || lumOff)
                colorRaw = htmlUtils.colorLuminance(colorRaw, lumMod, lumOff);

            this.hex = colorRaw;
            this.hexText = "#" + colorRaw;
            // this.rgbArray = htmlUtils.hexToRGBArray(colorRaw);
            this.rgbText = htmlUtils.hexToRGB(colorRaw, this.opacity);
            if (this.isHex)
                this.text = this.hexText;
            else if (this.isRGB)
                this.text = this.rgbText;
        } else {
            this.isTheme = true;
            this.theme = colorRaw;
        }
    }
}

module.exports = Color;