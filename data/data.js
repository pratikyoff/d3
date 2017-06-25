var data = generateData(4, 100);

function generateData(noOfLines, noOfPointsInLine) {
    if (noOfLines === undefined) noOfLines = 3;
    var temp = [];
    for (var i = 0; i < noOfLines; i++) {
        temp.push(createRandomNumbers(undefined, undefined, undefined, noOfPointsInLine));
    }
    return temp;
}

function createRandomNumbers(startPoint, deviation, positiveDisProb, totalDataPoints) {
    if (startPoint === undefined) startPoint = 500;
    if (deviation === undefined) deviation = 20;
    if (positiveDisProb === undefined) positiveDisProb = 0.5;
    if (totalDataPoints === undefined) totalDataPoints = 100;

    var finalData = [parseInt(Math.random() * startPoint)];
    for (var i = 1; i < totalDataPoints; i++) {
        var temp = 0;
        temp = parseInt(finalData[i - 1] + (Math.random() * deviation) * (Math.random() < positiveDisProb ? 1 : -1));
        if (temp < 0) temp = parseInt(Math.random() * deviation);
        finalData.push(temp);
    }
    return finalData;
}
