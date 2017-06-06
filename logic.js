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
