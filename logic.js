//svg container
var svg = d3.select("body")
    .append("svg")
    .attr("viewBox", "0 0 500 100")
    .style("border", "1px solid black");;

//circles
var circles = svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle");
var circleAttr = circles
    .attr("cx", function(d, i) {
        var xpos = (i * 10 + 5) * 2;
        return xpos;
    })
    .attr("cy", 25)
    .attr("r", function(d) {
        return d;
    })
    .style("fill", "green");

//showing data
d3.select("body")
    .append("div")
    .text(function() {
        var d2show = "Data: ";
        for (var i = 0; i < data.length; i++) {
            d2show += data[i] + " ";
        }
        return d2show;
    });

///////////////Graph

var divDOM = d3.select("body").select("div");
var svgGraph = divDOM.append("svg");
var svgWidth = 2000;
var svgHeight = 1000;
svgGraph.attr("viewBox", "0 0 " + svgWidth + " " + svgHeight);
svgGraph.style("border", "1px solid black");
var x_axisOffset = 50;
var y_axisOffset = 50;

//x-axis
var x_axis = svgGraph.append("g");
x_axis.attr("id", "x_axis");
x_axis.append("line")
    .attr("x1", x_axisOffset)
    .attr("y1", svgHeight - y_axisOffset)
    .attr("x2", svgWidth - x_axisOffset)
    .attr("y2", svgHeight - y_axisOffset)
    .style("stroke", "black").style("stroke-width", 1);
x_axis.append("polyline")
    .attr("points", function() {
        var pointx = svgWidth - x_axisOffset;
        var pointy = svgHeight - y_axisOffset;
        return (pointx - 7) + "," + (pointy - 7) + " " + pointx + "," + pointy + " " + (pointx - 7) + "," + (pointy + 7);
    })
    .attr("fill", "none")
    .style("stroke", "black").style("stroke-width", 1);

//y-axis
var y_axis = svgGraph.append("g");
y_axis.attr("id", "y_axis");
y_axis.append("line")
    .attr("x1", x_axisOffset)
    .attr("y1", y_axisOffset)
    .attr("x2", x_axisOffset)
    .attr("y2", svgHeight - y_axisOffset)
    .style("stroke", "black").style("stroke-width", 1);
y_axis.append("polyline")
    .attr("points", function() {
        var pointx = x_axisOffset;
        var pointy = y_axisOffset;
        return (pointx - 7) + "," + (pointy + 7) + " " + pointx + "," + pointy + " " + (pointx + 7) + "," + (pointy + 7);
    })
    .attr("fill", "none")
    .style("stroke", "black").style("stroke-width", 1);

//Graph Points
var plotArea = svgGraph.append("g");
plotArea.attr("id", "plotArea");

//Graph Functions

//Plot a single point
function plotPoint(x, y, pointSize) {
    if (pointSize === undefined) pointSize = 3;
    var point = plotArea.append("circle");
    point.attr("cx", x + x_axisOffset);
    point.attr("cy", svgHeight - y - y_axisOffset);
    point.attr("r", pointSize);
    point.attr("fill", "black");
}

//plotting points from data
function plotDataPoints() {
    var maxY = data[0];
    for (var i = 0; i < data.length; i++) {
        if (data[i] > maxY) maxY = data[i];
    }
    var scaleX = 0.9 * (svgWidth - 2 * x_axisOffset) / data.length;
    var scaleY = 0.9 * (svgHeight - 2 * y_axisOffset) / maxY;
    for (var i = 0; i < data.length; i++) {
        plotPoint(i * scaleX, data[i] * scaleY);
    }
}
plotDataPoints();
