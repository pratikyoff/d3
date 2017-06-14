var inputDOM = d3.select("div#plotLines");
var lineCounter = 0;

//initializing data
function inititalizeData() {
    for (var i = 0; i < data.length; i++) {

        addInputPlotLine();
    }
}

function addInputPlotLine(line) {
    var tempLineDiv = inputDOM.append("div")
        .attr("id", "line" + lineCounter)
        .style("padding", "10px 10px 10px 10px");
    tempLineDiv.append("span")
        .style("background", graphLineColours[lineCounter % graphLineColours.length])
        .style("width", "10px")
        .style("height", "10px")
        .style("display", "inline-block")
        .style("border", "1px solid black")
        .style("margin","5px");
    var tempLineText = tempLineDiv.append("span")
        .attr("id", "line" + lineCounter + "text")
        .html("Line " + (lineCounter + 1));
    lineCounter++;
}

inititalizeData();
