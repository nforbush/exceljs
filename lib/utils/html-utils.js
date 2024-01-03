
const htmlUtils = {

    // https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/dd560821(v=office.12)?redirectedfrom=MSDN#customizing-theme-aware-colors
    // helpful: https://www.w3schools.com/colors/colors_converter.asp
    colorLuminance:
        function(hex, lumMod, lumOff) {
            // validate hex string
            const regexp = /^[A-Fa-f0-9]+$/;
            if (!regexp.test(hex))
                return hex;
            if (hex === "FFFFFF" && (lumMod !== 0 || lumOff !== 0))
                hex = "000000";
            let rgbArray = this.hexToRGBArray(hex);
            const hsl = this.RGBToHSL(rgbArray[0], rgbArray[1], rgbArray[2]);
            hsl[2] = ((hsl[2]/100 * (lumMod || 0)/1000) + (lumOff || 0)/1000);
            rgbArray = this.HSLToRGB(hsl[0], hsl[1], hsl[2]);
            let rgb = this.RGBToHex(rgbArray[0], rgbArray[1], rgbArray[2]);
            return rgb.toUpperCase();
        },
    // https://www.30secondsofcode.org/js/s/hex-to-rgb
    hexToRGBArray:
        function(hex) {
            let alpha = false,
                h = hex.slice(hex.startsWith('#') ? 1 : 0);
            if (h.length === 3)
                h = [...h].map(x => x + x).join('');
            else if (h.length === 8)
                alpha = true;
            h = parseInt(h, 16);
            return [(h >>> (alpha ? 24 : 16)), ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)), ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)), (alpha ? `, ${h & 0x000000ff}` : undefined)];
        },
    hexToRGB:
        function (hex, opacity) {
            const a = opacity >= 0 ? "a" : "";
            const transparency = opacity >= 0 ? "," + opacity.toFixed(2) : "";
            const hexArray = this.hexToRGBArray(hex);
            const rgb = hexArray.join(",").replace(/,$/, "");
            return "rgb" + a + "(" + rgb + transparency + ")";
        },
    // https://www.30secondsofcode.org/js/s/rgb-to-hsl
    RGBToHSL:
        function(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;
            const l = Math.max(r, g, b);
            const s = l - Math.min(r, g, b);
            const h = s
                ? l === r
                    ? (g - b) / s
                    : l === g
                        ? 2 + (b - r) / s
                        : 4 + (r - g) / s
                : 0;
            return [
                60 * h < 0 ? 60 * h + 360 : 60 * h,
                100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
                (100 * (2 * l - s)) / 2,
            ];
        },
    // https://www.30secondsofcode.org/js/s/hsl-to-rgb
    HSLToRGB:
        function (h, s, l) {
            s /= 100;
            l /= 100;
            const k = n => (n + h / 30) % 12;
            const a = s * Math.min(l, 1 - l);
            const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
            return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
        },
    // https://linuxhint.com/convert-rgb-to-hex-javascript/
    RGBToHex: function(r, g, b) {
        return(this.decimalToHex(r) + this.decimalToHex(g) + this.decimalToHex(b));
    },
    decimalToHex: function(number) {
        return number.toString(16);
    },
}
module.exports = htmlUtils;