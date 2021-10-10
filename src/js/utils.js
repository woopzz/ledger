exports.floatRound = function (number, places=2) {
    return +(Math.round(number + "e+" + places)  + "e-" + places);
}
