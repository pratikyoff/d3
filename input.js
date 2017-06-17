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
    var tempLineData = tempLineDiv.append("span")
        .attr("id", "line" + lineCounter + "indivData");
    for (var i = 0; i < data[lineCounter].length; i++) {
        tempLineData.append("input")
            .attr("type", "number")
            .attr("value", data[lineCounter][i])
            .attr("onchange", "renderGraph()");
    }
    tempLineDiv.append("span")
        .html("&#x2795;")
        .attr("class", "addDelSymbol")
        .attr("onclick", "onLineDataAdd('add'," + lineCounter + ")");
    tempLineDiv.append("span")
        .html("&#x274c;")
        .attr("class", "addDelSymbol")
        .attr("onclick", "onLineDataAdd('del'," + lineCounter + ")");
    lineCounter++;
}

inititalizeData();

function onLineDataAdd(addOrDel, lineNo, line) {
    if (addOrDel === "add") {
        data[lineNo].push(data[lineNo][data[lineNo].length - 1]);
    }
    if (addOrDel === "del") {
        data[lineNo].length = data[lineNo].length - 1;
    }
    renderGraph();
}

function onLineDataChange() {

}

function onLineAdd() {

}
