///////////////Graph

var divDOM = d3.select("body").select("div#svg");
divDOM.style("border", "1px solid black");

function renderGraph() {
    divDOM.selectAll("svg").remove();
    var svgGraph = divDOM.append("svg");
    svgGraph.attr("viewBox", "0 0 " + svgWidth + " " + svgHeight);
    var maxY = data[0][0];
    var maxX = data[0].length;
    getMaxElements();
    var noOfXMarkers = maxX > 15 ? 15 : maxX;
    var noOfYMarkers = maxY > 10 ? 10 : maxY;

    //background shade
    svgGraph.append("rect")
        .attr("x", x_axisOffset + x_axisLegendTextOffset)
        .attr("y", y_axisOffset)
        .attr("width", svgWidth - 2 * x_axisOffset - x_axisLegendTextOffset)
        .attr("height", svgHeight - 2 * y_axisOffset - x_axisLegendTextOffset)
        .style("fill", backgroundShadeColour);

    //x-axis
    var x_axis = svgGraph.append("g");
    x_axis.attr("id", "x_axis");
    var x_axisPoints = [
        x_axisOffset + x_axisLegendTextOffset,
        svgHeight - y_axisOffset - x_axisLegendTextOffset,
        svgWidth - x_axisOffset - x_axisLegendTextOffset,
        svgHeight - y_axisOffset - x_axisLegendTextOffset
    ];
    x_axis.append("line")
        .attr("x1", x_axisPoints[0])
        .attr("y1", x_axisPoints[1])
        .attr("x2", x_axisPoints[2])
        .attr("y2", x_axisPoints[3])
        .style("stroke", "black").style("stroke-width", axisWidth);
    x_axis.append("polyline")
        .attr("points", function() {
            var pointx = x_axisPoints[2];
            var pointy = x_axisPoints[3];
            return (pointx - 7) + "," + (pointy - 7) + " " + pointx + "," + pointy + " " + (pointx - 7) + "," + (pointy + 7);
        })
        .attr("fill", "none")
        .style("stroke", "black").style("stroke-width", axisWidth);
    var x_axisLegend = x_axis.append("g");
    for (var i = 1; i <= noOfXMarkers; i++) {
        var xcor = x_axisPoints[0] + i * 0.9 * (x_axisPoints[2] - x_axisPoints[0]) / noOfXMarkers;
        x_axisLegend.append("line")
            .attr("x1", xcor)
            .attr("y1", x_axisPoints[1])
            .attr("x2", xcor)
            .attr("y2", y_axisOffset)
            .style("stroke", helperLineColour).style("stroke-width", 1);
        x_axisLegend.append("line")
            .attr("x1", xcor)
            .attr("y1", x_axisPoints[1] - legendMarkerLength)
            .attr("x2", xcor)
            .attr("y2", x_axisPoints[1] + legendMarkerLength)
            .style("stroke", "black").style("stroke-width", 2);
        x_axisLegend.append("text")
            .text(Math.round((i * maxX / noOfXMarkers) * 100) / 100)
            .attr("x", xcor)
            .attr("y", x_axisPoints[1] + 30)
            .attr("font-family", "sans-serif")
            .attr("font-size", axisFontSize)
            .attr("text-anchor", "middle")
            .attr("fill", "black");
    }
    var x_axisLegendTextSvg = x_axis.append("g");
    x_axisLegendTextSvg.append("text")
        .html(x_axisLegendText);

    //y-axis
    var y_axis = svgGraph.append("g");
    y_axis.attr("id", "y_axis");
    var y_axisPoints = [
        x_axisOffset + x_axisLegendTextOffset,
        svgHeight - y_axisOffset - x_axisLegendTextOffset,
        x_axisOffset + x_axisLegendTextOffset,
        y_axisOffset
    ];
    y_axis.append("line")
        .attr("x1", y_axisPoints[0])
        .attr("y1", y_axisPoints[1])
        .attr("x2", y_axisPoints[2])
        .attr("y2", y_axisPoints[3])
        .style("stroke", "black").style("stroke-width", axisWidth);
    y_axis.append("polyline")
        .attr("points", function() {
            var pointx = y_axisPoints[2];
            var pointy = y_axisPoints[3];
            return (pointx - 7) + "," + (pointy + 7) + " " + pointx + "," + pointy + " " + (pointx + 7) + "," + (pointy + 7);
        })
        .attr("fill", "none")
        .style("stroke", "black").style("stroke-width", axisWidth);
    var y_axisLegend = y_axis.append("g");
    for (var i = 1; i <= noOfYMarkers; i++) {
        var ycor = y_axisPoints[1] - i * 0.9 * (y_axisPoints[1] - y_axisPoints[3]) / noOfYMarkers;
        y_axisLegend.append("line")
            .attr("x1", y_axisPoints[0])
            .attr("y1", ycor)
            .attr("x2", svgWidth - x_axisOffset)
            .attr("y2", ycor)
            .style("stroke", helperLineColour).style("stroke-width", 1);
        y_axisLegend.append("line")
            .attr("x1", y_axisPoints[0] - legendMarkerLength)
            .attr("y1", ycor)
            .attr("x2", y_axisPoints[0] + legendMarkerLength)
            .attr("y2", ycor)
            .style("stroke", "black").style("stroke-width", 2);
        y_axisLegend.append("text")
            .text(Math.round((i * maxY / noOfYMarkers) * 100) / 100)
            .attr("x", y_axisPoints[0] - 40)
            .attr("y", ycor + 10)
            .attr("font-family", "sans-serif")
            .attr("font-size", axisFontSize)
            .attr("text-anchor", "middle")
            .attr("fill", "black");
    }

    //Graph Points
    var plotArea = svgGraph.append("g");
    plotArea.attr("id", "plotArea");

    //Graph Functions

    //Getting maximum y coordinate
    function getMaxElements() {
        for (var i = 0; i < data.length; i++) {
            if (data[i].length > maxX) maxX = data[i].length;
            for (var j = 0; j < data[i].length; j++) {
                if (data[i][j] > maxY) maxY = data[i][j];
            }
        }
    }

    //Plot a single point
    function plotPoint(x, y, pointSize, pointColour) {
        if (pointSize === undefined) pointSize = 2.5;
        if (pointColour === undefined) pointColour = "black";
        if (pointSize < 1) return;
        var point = plotArea.append("circle");
        point.attr("cx", x + x_axisPoints[0]);
        point.attr("cy", x_axisPoints[1] - y);
        point.attr("r", pointSize);
        point.attr("fill", pointColour);
    }

    //Draw a line on graph
    function drawGraphLine(x1, y1, x2, y2, lineWidth, lineColour) {
        if (lineWidth === undefined) lineWidth = 2;
        if (lineColour === undefined) lineColour = "black";
        plotArea.append("line")
            .attr("x1", x1 + x_axisPoints[0])
            .attr("y1", x_axisPoints[1] - y1)
            .attr("x2", x2 + x_axisPoints[0])
            .attr("y2", x_axisPoints[1] - y2)
            .style("stroke", lineColour).style("stroke-width", lineWidth);
    }

    //plotting points from data
    function plotDataPoints() {
        var scaleX = 0.9 * (svgWidth - 2 * x_axisOffset) / maxX;
        var scaleY = 0.9 * (svgHeight - 2 * y_axisOffset) / maxY;
        for (var i = 0; i < data.length; i++) {
            var colour = graphLineColours[i % graphLineColours.length];
            for (var j = 0; j < data[i].length; j++) {
                plotPoint(j * scaleX, data[i][j] * scaleY, undefined, colour);
                if (j > 0)
                    drawGraphLine((j - 1) * scaleX, data[i][j - 1] * scaleY, j * scaleX, data[i][j] * scaleY, undefined, colour);
            }
        }
    }
    plotDataPoints();
}

renderGraph();
