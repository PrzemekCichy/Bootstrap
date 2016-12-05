var ProgressPie = (function () {
    function ProgressPie(name) {
        this.name = name;
    }
    //Methods
    ProgressPie.prototype.testMethod = function () { };
    ;
    ProgressPie.prototype.Name = function () {
        var _this = this;
        console.log(this);
        var a = function () {
            console.log(_this.name);
        };
        a();
    };
    ;
    ProgressPie.prototype.createSvg = function () {
        var container = d3.select("#content")
            .append("svg")
            .attr("width", 555)
            .attr("height", 123)
            .append("g")
            .attr("transform", "translate(" + 11 + "," + 11 + ")");
        d3.svg.arc().
        ;
    };
    return ProgressPie;
}());
var pie1 = new ProgressPie("Jan");
pie1.Name();
var pie2 = new ProgressPie("Przemo");
