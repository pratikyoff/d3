d3.selection.prototype.first = function() {
    return d3.select(this._groups[0][0]);
};
d3.selection.prototype.last = function() {
    var last = this.size() - 1;
    return d3.select(this._groups[0][last]);
};
d3.selection.prototype.elementAtIndex = function(index) {
    return d3.select(this._groups[0][index]);
};

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
            .attr("onchange", "onLineDataChange(" + lineCounter + "," + i + ")");
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

function onLineDataAdd(addOrDel, lineNo) {
    if (addOrDel === "add") {
        data[lineNo].push(data[lineNo][data[lineNo].length - 1]);
        inputDOM.select("span#line" + lineNo + "indivData")
            .append("input")
            .attr("type", "number")
            .attr("value", data[lineNo][data[lineNo].length - 1])
            .attr("onchange", "onLineDataChange(" + lineNo + "," + (data[lineNo].length - 1) + ")");
    }
    if (addOrDel === "del") {
        data[lineNo].length = data[lineNo].length - 1;
        inputDOM.select("span#line" + lineNo + "indivData")
            .selectAll("input")
            .last()
            .remove();
    }
    renderGraph();
}

function onLineDataChange(lineNo, indexInLine) {
    data[lineNo][indexInLine] = inputDOM.select("span#line" + lineNo + "indivData")
        .selectAll("input")
        .elementAtIndex(indexInLine)
        ._groups[0][0].value;
    renderGraph();
}

function onLineAdd() {

}

function createRandomNumbers() {
    var startPoint = 100;
    var deviation = 30;
    var positiveDisProb = 0.65;
    var totalDataPoints = 100;

    var finalData = [parseInt(Math.random() * startPoint)];
    for (var i = 0; i < totalDataPoints; i++) {
        var temp = 0;
        if (i > 0) {
            temp = parseInt(finalData[i - 1] + (Math.random() * deviation) * (Math.random() < positiveDisProb ? 1 : -1));
            finalData.push(temp);
        }
    }
    d3.select("body").append("div")
        .html(finalData);
}
