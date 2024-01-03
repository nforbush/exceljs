const CompositeExtXform = require('../composite-ext-xform');
const IntegerXform = require('../simple/integer-xform');
const StringXform = require('../simple/string-xform');
const SeriesXform = require('./series-xform');
const DataLabelsXform = require('./data-labels-xform');

class LineChartXform extends CompositeExtXform {
    constructor() {
        super();

        this.tag = "c:lineChart";
        this.isArrayList = ["ser", "axId"];
        this.map = {
            "c:ser" : new SeriesXform(),
            "c:dLbls" : new DataLabelsXform(),
            "c:grouping" : new StringXform({tag: "c:grouping", attr: "val"}),
            "c:varyColors" : new IntegerXform({tag: "c:varyColors", attr: "val"}),
            "c:marker" : new IntegerXform({tag: "c:marker", attr: "val"}),
            "c:smooth" : new IntegerXform({tag: "c:smooth", attr: "val"}),
            "c:axId" : new IntegerXform({tag: "c:axId", attr: "val"}),
        };
    }
}

module.exports = LineChartXform;
