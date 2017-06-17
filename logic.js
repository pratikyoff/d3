///////////////Graph

var divDOM = d3.select("body").select("div#svg");

function renderGraph() {
    divDOM.selectAll("svg").remove();
    var svgGraph = divDOM.append("svg");
    svgGraph.attr("viewBox", "0 0 " + svgWidth + " " + svgHeight);
    var maxY = data[0][0];
    var maxX = data[0].length;
    getMaxElements();
    var noOfXMarkers = maxX;
    var noOfYMarkers = maxY;

    //background shade
    svgGraph.append("rect")
        .attr("x", x_axisOffset)
        .attr("y", y_axisOffset)
        .attr("width", svgWidth - 2 * x_axisOffset)
        .attr("height", svgHeight - 2 * y_axisOffset)
        .style("fill", backgroundShadeColour);

    //x-axis
    var x_axis = svgGraph.append("g");
    x_axis.attr("id", "x_axis");
    x_axis.append("line")
        .attr("x1", x_axisOffset)
        .attr("y1", svgHeight - y_axisOffset)
        .attr("x2", svgWidth - x_axisOffset)
        .attr("y2", svgHeight - y_axisOffset)
        .style("stroke", "black").style("stroke-width", axisWidth);
    x_axis.append("polyline")
        .attr("points", function() {
            var pointx = svgWidth - x_axisOffset;
            var pointy = svgHeight - y_axisOffset;
            return (pointx - 7) + "," + (pointy - 7) + " " + pointx + "," + pointy + " " + (pointx - 7) + "," + (pointy + 7);
        })
        .attr("fill", "none")
        .style("stroke", "black").style("stroke-width", axisWidth);
    var x_axisLegend = x_axis.append("g");
    for (var i = 1; i <= noOfXMarkers; i++) {
        var xcor = x_axisOffset + i * 0.9 * (svgWidth - 2 * x_axisOffset) / noOfXMarkers;
        x_axisLegend.append("line")
            .attr("x1", xcor)
            .attr("y1", svgHeight - y_axisOffset)
            .attr("x2", xcor)
            .attr("y2", y_axisOffset)
            .style("stroke", helperLineColour).style("stroke-width", 1);
        x_axisLegend.append("line")
            .attr("x1", xcor)
            .attr("y1", svgHeight - y_axisOffset - legendMarkerLength)
            .attr("x2", xcor)
            .attr("y2", svgHeight - y_axisOffset + legendMarkerLength)
            .style("stroke", "black").style("stroke-width", 2);
        x_axisLegend.append("text")
            .text(i * maxX / noOfXMarkers)
            .attr("x", xcor)
            .attr("y", svgHeight - y_axisOffset + 30)
            .attr("font-family", "sans-serif")
            .attr("font-size", axisFontSize)
            .attr("text-anchor", "middle")
            .attr("fill", "black");
    }

    //y-axis
    var y_axis = svgGraph.append("g");
    y_axis.attr("id", "y_axis");
    y_axis.append("line")
        .attr("x1", x_axisOffset)
        .attr("y1", y_axisOffset)
        .attr("x2", x_axisOffset)
        .attr("y2", svgHeight - y_axisOffset)
        .style("stroke", "black").style("stroke-width", axisWidth);
    y_axis.append("polyline")
        .attr("points", function() {
            var pointx = x_axisOffset;
            var pointy = y_axisOffset;
            return (pointx - 7) + "," + (pointy + 7) + " " + pointx + "," + pointy + " " + (pointx + 7) + "," + (pointy + 7);
        })
        .attr("fill", "none")
        .style("stroke", "black").style("stroke-width", axisWidth);
    var y_axisLegend = y_axis.append("g");
    for (var i = 1; i <= noOfYMarkers; i++) {
        var ycor = svgHeight - y_axisOffset - i * 0.9 * (svgHeight - 2 * y_axisOffset) / noOfYMarkers;
        y_axisLegend.append("line")
            .attr("x1", x_axisOffset)
            .attr("y1", ycor)
            .attr("x2", svgWidth - x_axisOffset)
            .attr("y2", ycor)
            .style("stroke", helperLineColour).style("stroke-width", 1);
        y_axisLegend.append("line")
            .attr("x1", x_axisOffset - legendMarkerLength)
            .attr("y1", ycor)
            .attr("x2", x_axisOffset + legendMarkerLength)
            .attr("y2", ycor)
            .style("stroke", "black").style("stroke-width", 2);
        y_axisLegend.append("text")
            .text(i * maxY / noOfYMarkers)
            .attr("x", x_axisOffset - 40)
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
        if (pointSize === undefined) pointSize = 4;
        if (pointColour === undefined) pointColour = "black";
        var point = plotArea.append("circle");
        point.attr("cx", x + x_axisOffset);
        point.attr("cy", svgHeight - y - y_axisOffset);
        point.attr("r", pointSize);
        point.attr("fill", pointColour);
    }

    //Draw a line on graph
    function drawGraphLine(x1, y1, x2, y2, lineWidth, lineColour) {
        if (lineWidth === undefined) lineWidth = 2;
        if (lineColour === undefined) lineColour = "black";
        plotArea.append("line")
            .attr("x1", x1 + x_axisOffset)
            .attr("y1", svgHeight - y1 - y_axisOffset)
            .attr("x2", x2 + x_axisOffset)
            .attr("y2", svgHeight - y2 - y_axisOffset)
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
