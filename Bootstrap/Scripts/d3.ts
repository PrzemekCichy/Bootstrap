declare var $;

module Gauge {
    const margin = { top: 30, right: 20, bottom: 30, left: 50 };
    const containerWidth: number = 600;
    const containerHeight: number = 150;
    const height: number = containerHeight - margin.top - margin.bottom;
    //Maximum value for this gauge is defined by
    //containerWidth - margin.left - margin.right;
    const width: number = containerWidth - margin.left - margin.right;
    var dataValue: [number] = [0];

    //Changing range values changes scale start and end point
    var xAxisScale = d3.scale.linear().range([0, width]).domain([0, 100]);

    //Make container which holds scale and moving bar
    var svgContainer: any = d3.select("#content")
        .append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    //.attr("style", "outline: thin solid blue;");

    //create rectangle based on passed value dataValue
    svgContainer.selectAll("rect")
        .data(dataValue)
        .enter()
        .append("rect")
        .attr({
            x: 0,
            y: 0,
            width: function (d, i) { return d; },
            height: height,
            fill: function (d, i) { return "rgb(" + 0 + ", 10, 100)" }
        });

    //Axis
    var xAxis = d3.svg.axis().scale(xAxisScale)
        .orient("bottom").ticks(10);

    svgContainer.append("g")         // Add the X Axis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    //Sets up the connection to Hub
    var d3DataHub = $.connection.d3DataHub;
    $.connection.hub.logging = true;
    $.connection.hub.start()
        .done(function () {
            d3DataHub.server.strartUpdatingValues();
        });

    //Deals with info incoming from server
    d3DataHub.client.gaugeState = function (message): void {
        changeData(message);
    }

    var updateDelay = 1000;
    function changeData(data): void {
        dataValue[0] = data;
        svgContainer.selectAll("rect")
            .data(dataValue)
            .transition()
            .duration(1000)
            .ease("linear")//default, others are bounce, elastic, circle
            //Change the actual value
            .attr({
                width: function (d, i) { return d; },
            });
    }

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