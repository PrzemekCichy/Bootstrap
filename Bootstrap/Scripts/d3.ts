declare var $;

module Gauge {

    enum Direction {
        Left = 0,
        Right
    }


    class Margin {
        public top: number;
        public right: number;
        public left: number;
        public bottom: number;
        public constructor(left = 50, right = 20, top = 30, bottom = 30) {
            this.left = left;
            this.right = right;
            this.top = top;
            this.bottom = bottom;
        }
    }

    export class Gauge {
        private height: number;
        private width: number;
        private margin: Margin;
        private containerWidth: number;
        private containerHeight: number;
        private multiplierConstant: number;
        private dataValue = [60];
        private svgContainer: any;

        private leftScaleValue;
        private rightScaleValue;
        private xPosition;
        private direction;

        private caclculateProperties(orientation) {
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
        }

        public constructor(containerWidth, containerHeight, margin: Margin, orientation: Direction) {
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

        //Make container which holds scale and moving bar
        private createContainer():any {
            var container = d3.select("#content")
                .append("svg")
                .attr("width", this.containerWidth)
                .attr("height", this.containerHeight)
                .append("g")
                .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
            return container;
        };

        public createRectangle() {
            //create rectangle based on passed value dataValue
            this.svgContainer.selectAll("rect")
                .data(this.dataValue)
                .enter()
                .append("rect")
                .attr({
                    y: 0,
                    //direction has to be 0 for left to right
                    x: (d, i) => {
                        console.log(this.width - d * this.multiplierConstant);
                        return (this.width - d * this.multiplierConstant) * this.direction
                    },
                    width: (d, i)=> { return d * this.multiplierConstant},
                    height: this.height,
                    fill: function (d, i) { return "rgb(" + 0 + ", 10, 100)" }
                });
            return this;
        }

        public createAxis() {
            //Changing range values changes scale start and end point
            var xAxisScale = d3.scale.linear().range([this.leftScaleValue, this.rightScaleValue]).domain([0, 100]);

            //Axis
            var xAxis = d3.svg.axis().scale(xAxisScale)
                .orient("bottom").ticks(10);

            this.svgContainer.append("g")         // Add the X Axis
                .attr("class", "x axis")
                .attr("transform", "translate(0," + this.height + ")")
                .call(xAxis);
            return this;
        }


        public setUpD3() {
            //Sets up the connection to Hub
            var d3DataHub = $.connection.d3DataHub;
            $.connection.hub.logging = true;
            $.connection.hub.start()
                .done(function () {
                    d3DataHub.server.strartUpdatingValues();
                });

            //Deals with info incoming from server
            d3DataHub.client.gaugeState = (message): void => {
                this.changeData(this.dataValue, message);
            }
        }
        
        changeData(dataValue, serverData) {
            this.dataValue[0] = serverData;
            this.svgContainer.selectAll("rect")
                .data(this.dataValue)
                .transition()
                .duration(1000)
                .ease("linear")//default, others are bounce, elastic, circle
                //Change the actual value
                .attr({
                    x: (d, i) => {
                        console.log(this.width - d * this.multiplierConstant);
                        return (this.width - d * this.multiplierConstant) * this.direction
                    },
                    width: (d, i) => { return d * this.multiplierConstant },
                });
        }
    }



    export var gauge = new Gauge(600, 150, new Margin(50, 20, 30, 30), 1);
    gauge.createRectangle().createAxis()
    gauge.setUpD3();

  // export var gauge1 = new Gauge(600, 150, new Margin(50, 20, 30, 30), 0);
 //  gauge1.createRectangle().createAxis()
//gauge1.setUpD3();
}









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