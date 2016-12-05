class ProgressPie {

    //Properties
    private name: string;
    private svg;
    //Methods
    private testMethod() { };
    public Name() {
        console.log(this);
        var a = ()  => {
            console.log(this.name);
        };
        a();
    };

    constructor(name: string) {
        this.name = name;
    }
    private createSvg() {
        var container = d3.select("#content")
            .append("svg")
            .attr("width", 555)
            .attr("height", 123)
            .append("g")
            .attr("transform", "translate(" + 11 + "," + 11 + ")");
        d3.svg.arc().
    }
    
}
var pie1 = new ProgressPie("Jan");
pie1.Name();
var pie2 = new ProgressPie("Przemo");
