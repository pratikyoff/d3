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
        .attr("class", "inputLineColour");
    var tempLineText = tempLineDiv.append("span")
        .attr("id", "line" + lineCounter + "text")
        .attr("class", "inputLineText")
        .html("Line " + (lineCounter + 1));
    var tempLineData = tempLineDiv.append("span");
    for (var i = 0; i < data[lineCounter].length; i++) {
        tempLineData.append("input")
            .attr("type", "number")
            .attr("value", data[lineCounter][i]);
    }
    tempLineData.append("span")
        .html("&#x2795;&#x274c;");
    lineCounter++;
}

inititalizeData();
