//svg container
var svg = d3.select("body")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "200px")
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

/////////////////////////////////////////////////
//Graph

var divDOM = d3.select("body").select("div");
var svgGraph = divDOM.append("svg");
svgGraph.attr("width", "100%");
var svgWidth = svgGraph.node().getBoundingClientRect().width;
var svgHeight = svgWidth / 1.5;
svgGraph.attr("width", svgWidth - 15 + "px");
svgWidth -= 15;
svgGraph.attr("height", svgHeight + "px");
// svgGraph.style("border", "1px solid black");

//x-axis
var x_axis = svgGraph.append("g");
x_axis.append("line")
    .attr("x1", 10)
    .attr("y1", svgHeight - 10)
    .attr("x2", svgWidth - 10)
    .attr("y2", svgHeight - 10)
    .style("stroke", "black").style("stroke-width", 1);
x_axis.append("polyline")
    .attr("points", function() {
        var pointx = svgWidth - 10;
        var pointy = svgHeight - 10;
        return (pointx - 7) + "," + (pointy - 7) + " " + pointx + "," + pointy + " " + (pointx - 7) + "," + (pointy + 7);
    })
    .attr("fill", "none")
    .style("stroke", "black").style("stroke-width", 2);

//y-axis
var y_axis = svgGraph.append("g");
y_axis.append("line")
    .attr("x1", 10)
    .attr("y1", 10)
    .attr("x2", 10)
    .attr("y2", svgHeight - 10)
    .style("stroke", "black").style("stroke-width", 1);
y_axis.append("polyline")
    .attr("points", function() {
        var pointx = 10;
        var pointy = 10;
        return (pointx - 7) + "," + (pointy + 7) + " " + pointx + "," + pointy + " " + (pointx + 7) + "," + (pointy + 7);
    })
    .attr("fill", "none")
    .style("stroke", "black").style("stroke-width", 2);
