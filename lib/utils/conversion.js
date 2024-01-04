// *** NEW ***
const HTMLParser = require('node-html-parser');
const pixelWidth = require('string-pixel-width');
const conversion = {
    convertToJavaScriptString: function(str, convertSingleQuote) {
        if (!str || typeof str !== 'string')
            return str;
        const regexpsReplace = [
            {regexp: /\\/, replace: '\\\\'},
            {regexp: /"/g, replace: '\\\''},
            {regexp: /\n/g, replace: '\\n'},
            {regexp: /\r/g, replace: '\\r'},
        ];
        if (convertSingleQuote)
            regexpsReplace.push({regexp: /'/g, replace: '\\\''});
        if (str.substring(0,1) === '"' || str.substring(0,1) === '\'')
            regexpsReplace.push({regexp: /\\n/g, replace: '<br>'});
        regexpsReplace.forEach(regexpReplace => {
            str = str.replace(regexpReplace.regexp, regexpReplace.replace);
        });
        return str;
    },
    convertToHtmlString: function(str) {
        if (!str)
            return str;
        // if (str.includes('<data>'))
        //     console.log('convertToHtmlString');
        const html = HTMLParser.parse(str);
        this.convertHtmlChildString(html);
        str = html.toString().replace(/"/g, '\\"');
        return str;
    },
    convertHtmlChildString: function(html) {
        html.childNodes.forEach(child => {
            if (child.nodeType === HTMLParser.NodeType.TEXT_NODE)
                child._rawText = child._rawText.replace(/\\/g, '\\\\').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/[\n\r]/g, '<br>');
            else {
                // mimic VBA code in output
                let styles = child.getAttribute('style');
                if (styles) {
                    const stylePairs = styles.split(';');
                    styles = '';
                    stylePairs.forEach(style => {
                        const pairs = style.split(':');
                        styles += `${pairs[0].trim()}: ${pairs[1].trim()};`;
                    });
                    child.setAttribute('style', styles);
                }
                const classes = child.getAttribute('class');
                if (classes)
                    child.setAttribute('class', classes);
                child.rawAttrs = child.rawAttrs.replace(/\\/g, '\\\\');
                if (child.childNodes.length)
                    this.convertHtmlChildString(child);
            }
        });
    },
    convertToBoolean: function(value) {
        return !Boolean(value) ? false : typeof value === 'string' && value.toLowerCase().trim() === 'true';
    },
    ptToPx: function(pt) {
        return Math.round(pt * 1.333333333333333333);
        // return Math.round(pt * 1.33333);
    },
    pxToPt: function(px) {
        return px / 1.333333333333333333;
        // return px / 1.33333;
    },
    EmuToPt: function(emu) {
        return Number((emu / 914400 * 72).toFixed(2));
    },
    EmuToPx: function(emu) {
        return Math.floor(emu / 9525);
    },
    pxWidth: function(string, options) {
        try {
            return pixelWidth(string, options);
        } catch(e) {
            options.font = 'Arial';
            return pixelWidth(string, options);
        }
    },
    objectToString: function(obj, name) {
        let objString = (name ? `${name}:` : '') + (!Array.isArray(obj) ? '{' : '[');
        Object.entries(obj).forEach(([key, value]) => {
            if (value === undefined)
                return;
            if (objString.length > (name ? name.length + 2 : 1))
                objString += ',';

            if (!Array.isArray(obj))
                objString += `${key}:`;
            if (value === null)
                objString += 'null';
            else {
                switch(typeof value) {
                    case 'string':
                        objString += `"${value}"`;
                        break;
                    case 'object':
                        if (value.objectFormat)
                            objString += value.objectFormat;
                        else
                            objString += this.objectToString(value);
                        break;
                    default:
                        objString += value;
                        break;
                }
            }
        });
        objString += (!Array.isArray(obj) ? '}' : ']');
        return objString;
    },
    JSDateToExcelDate: function(jsDate) {
        const serialNumber = (25569.0 + ((jsDate.getTime() - (jsDate.getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24)));
        return jsDate.getFullYear() === 1900 ? serialNumber - 1 : serialNumber;
    },
};
module.exports = conversion;