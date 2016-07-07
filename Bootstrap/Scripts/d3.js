var Gauge;
(function (Gauge_1) {
    var Direction;
    (function (Direction) {
        Direction[Direction["Left"] = 0] = "Left";
        Direction[Direction["Right"] = 1] = "Right";
    })(Direction || (Direction = {}));
    var Margin = (function () {
        function Margin(left, right, top, bottom) {
            if (left === void 0) { left = 50; }
            if (right === void 0) { right = 20; }
            if (top === void 0) { top = 30; }
            if (bottom === void 0) { bottom = 30; }
            this.left = left;
            this.right = right;
            this.top = top;
            this.bottom = bottom;
        }
        return Margin;
    })();
    var Gauge = (function () {
        function Gauge(containerWidth, containerHeight, margin, orientation) {
            this.multiplierConstant = 5.3;
            this.dataValue = [60];
            this.containerWidth = containerWidth;
            this.containerHeight = containerHeight;
            this.margin = margin;
            this.height = containerHeight - this.margin.top - this.margin.bottom;
            //Maximum value for this gauge is defined by
            //containerWidth - margin.left - margin.right;
            this.width = containerWidth - margin.left - margin.right;
            this.multiplierConstant = this.width / 100;
            this.svgContainer = this.createContainer();
            this.caclculateProperties(orientation);
        }
        Gauge.prototype.caclculateProperties = function (orientation) {
            if (orientation == 0) {
                this.leftScaleValue = this.width;
                this.rightScaleValue = 0;
                this.direction = 1;
                return;
            }
            //left to right
            this.leftScaleValue = 0;
            this.rightScaleValue = this.width;
            this.direction = 0;
        };
        //Make container which holds scale and moving bar
        Gauge.prototype.createContainer = function () {
            var container = d3.select("#content")
                .append("svg")
                .attr("width", this.containerWidth)
                .attr("height", this.containerHeight)
                .append("g")
                .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
            return container;
        };
        ;
        Gauge.prototype.createRectangle = function () {
            var _this = this;
            //create rectangle based on passed value dataValue
            this.svgContainer.selectAll("rect")
                .data(this.dataValue)
                .enter()
                .append("rect")
                .attr({
                y: 0,
                //direction has to be 0 for left to right
                x: function (d, i) {
                    console.log(_this.width - d * _this.multiplierConstant);
                    return (_this.width - d * _this.multiplierConstant) * _this.direction;
                },
                width: function (d, i) { return d * _this.multiplierConstant; },
                height: this.height,
                fill: function (d, i) { return "rgb(" + 0 + ", 10, 100)"; }
            });
            return this;
        };
        Gauge.prototype.createAxis = function () {
            //Changing range values changes scale start and end point
            var xAxisScale = d3.scale.linear().range([this.leftScaleValue, this.rightScaleValue]).domain([0, 100]);
            //Axis
            var xAxis = d3.svg.axis().scale(xAxisScale)
                .orient("bottom").ticks(10);
            this.svgContainer.append("g") // Add the X Axis
                .attr("class", "x axis")
                .attr("transform", "translate(0," + this.height + ")")
                .call(xAxis);
            return this;
        };
        Gauge.prototype.setUpD3 = function () {
            var _this = this;
            //Sets up the connection to Hub
            var d3DataHub = $.connection.d3DataHub;
            $.connection.hub.logging = true;
            $.connection.hub.start()
                .done(function () {
                d3DataHub.server.strartUpdatingValues();
            });
            //Deals with info incoming from server
            d3DataHub.client.gaugeState = function (message) {
                _this.changeData(_this.dataValue, message);
            };
        };
        Gauge.prototype.changeData = function (dataValue, serverData) {
            var _this = this;
            this.dataValue[0] = serverData;
            this.svgContainer.selectAll("rect")
                .data(this.dataValue)
                .transition()
                .duration(1000)
                .ease("linear") //default, others are bounce, elastic, circle
                .attr({
                x: function (d, i) {
                    console.log(_this.width - d * _this.multiplierConstant);
                    return (_this.width - d * _this.multiplierConstant) * _this.direction;
                },
                width: function (d, i) { return d * _this.multiplierConstant; },
            });
        };
        return Gauge;
    })();
    Gauge_1.Gauge = Gauge;
    Gauge_1.gauge = new Gauge(600, 150, new Margin(50, 20, 30, 30), 1);
    Gauge_1.gauge.createRectangle().createAxis();
    Gauge_1.gauge.setUpD3();
    Gauge_1.gauge1 = new Gauge(600, 150, new Margin(50, 20, 30, 30), 0);
    Gauge_1.gauge1.createRectangle().createAxis();
    Gauge_1.gauge1.setUpD3();
})(Gauge || (Gauge = {}));
/*
svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function (d) { return d; })
    .attr({"text-anchor": "middle",
        x: function (d, i) { return i * barWidth; },
        y: function (d) { return h - d; }
    })


class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}



    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};
*/ 
//# sourceMappingURL=d3.js.map