import { FIELDS } from '../utils';

/**
 * An object representation of a payment which comes from PrivatBank CSV row.
 */
export default function Payment(values) {
    const self = {};

    const techNames = Object.values(FIELDS);
    for (let i = 0; i < techNames.length; i++) {
        self[techNames[i]] = values[i];
    }

    // docNo is used to indentify a payment, so it's required.
    if (!self.docNo) {
        const msg = 'A payment does not have a number!';
        alert(msg);
        throw Error(msg);
    }

    // We need a Date object to order records by date.
    self.date = new Date(self.dateStr.split(".").reverse().join("-"));

    // We order records by quarter.
    switch (self.date.getMonth()) {
        case 0: case 1: case 2:
            self.quarter = 1;
            break;
        case 3: case 4: case 5:
            self.quarter = 2;
            break;
        case 6: case 7: case 8:
            self.quarter = 3;
            break;
        case 9: case 10: case 11:
            self.quarter = 4;
            break;
    }

    // We add amounts, so we need the Number type to do it properly.
    self.amount = parseFloat(self.amountStr.replaceAll(" ", ""));

    return self;
}
