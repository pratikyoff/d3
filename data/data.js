var data = data100();

//500 x points
function data500() {
    return [
        createRandomNumbers(undefined, undefined, undefined, 500),
        createRandomNumbers(undefined, undefined, undefined, 500)
    ];
}

//100 x points
function data100() {
    return [
        createRandomNumbers(),
        createRandomNumbers(),
        createRandomNumbers(),
        createRandomNumbers()
    ];
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
