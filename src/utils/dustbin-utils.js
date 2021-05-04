function calculateFullPercent(height, distance){
    var fullRatio = 1-(distance/height);
    return Math.round(fullRatio*10000)/100;
}

function minTrigger(height){
    return 0.05*height;
}

module.exports={
    calculateFullPercent,
    minTrigger,
};