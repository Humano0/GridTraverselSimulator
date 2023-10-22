// Splits the id of grid elements
export function splitID(id) {
    const splittedID = id.slice(1).split("-");
    return splittedID;
}

// To add delay between lighting newly traversed grid elements
export function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Return id of the selected grid element for A* algorithm
export function idJoiner(row, column) {
    return "i" + row + "-" + column;
}