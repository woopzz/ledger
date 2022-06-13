export const floatRound = (number: number, places = 2): number => {
    const expNumber = Number(number + "e+" + places);
    return Number(Math.round(expNumber) + "e-" + places);
};
