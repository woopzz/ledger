export const floatRound = (number, places = 2) => +(Math.round(number + "e+" + places) + "e-" + places);
