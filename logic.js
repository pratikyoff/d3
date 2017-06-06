//svg container
var svg = d3.select("body")
    .append("svg")
    .attr("width", "100%");

//circles
var circles = svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle");
var circleAttr = circles
    .attr("cx", function(d,i) {
        var xpos = (i * 10 + 5)*2;
        return xpos;
    })
    .attr("cy", 25)
    .attr("r", function(d) {
        return d;
    })
    .style("fill", "green");

//visualizing data
d3.select("body")
    .selectAll("p")
    .data(data)
    .enter()
    .append("span")
    .text(function(d) {
        return d;
    })
    .style("padding-left", "1em");
