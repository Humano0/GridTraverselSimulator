import { splitID, idJoiner, delay } from "../simple_functions.js";
import { lightThePathASTAR } from "../light_the_path.js";

class Cell {
    constructor() {
        this.parent_i = 0;
        this.parent_j = 0;
        this.f = 0;
        this.g = 0;
        this.h = 0;
    }
}

// row, col, endnode
function isDestination(row, col, endNode) {
	const splitEnd = splitID(endNode);
	if (row == splitEnd[0] && col == splitEnd[1])
		return true;
	else
		return false;
}

// cell row and column numbers.
// size of the grid.
function isValid(nodeRow, nodeColumn, rowNumber, columnNumber) {
	return nodeRow >= 0 && nodeRow < rowNumber && nodeColumn >= 0 && nodeColumn < columnNumber;
}

function isUnblocked(grid, row, col) {
	if (Number(grid[row][col]) !== 0)
		return true;
	else
		return false;
}

// Euclidean Distance Formula
function calculateHValue(row, col, endNode) {
	const splitEnd = splitID(endNode);
	return Number(Math.sqrt((Number(row) - Number(splitEnd[0])) * (Number(row) - Number(splitEnd[0])) + (Number(col) - Number(splitEnd[1])) * (Number(col) - Number(splitEnd[1]))));
}

function createClosedList(rowNumber, columnNumber) {
    let closedList = new Array(rowNumber);
    for (let i = 0; i < rowNumber; i++) {
        closedList[i] = new Array(columnNumber).fill(false);
    }
    return closedList;
}

function createCellDetails(splitStart, rowNumber, columnNumber) {
    let celldetails = new Array(rowNumber);
    for (let i = 0; i < rowNumber; i++) {
        celldetails[i] = new Array(columnNumber);
    }
    for (let i = 0; i < rowNumber; i++) {
        for (let j = 0; j < columnNumber; j++) {
            celldetails[i][j] = new Cell();
            celldetails[i][j].f = 2147483647;
            celldetails[i][j].g = 2147483647;
            celldetails[i][j].h = 2147483647;
            celldetails[i][j].parent_i = -1;
            celldetails[i][j].parent_j = -1;
        }
    }

	let x = splitStart[0];
	let y = splitStart[1];
	celldetails[x][y].f = 0;
	celldetails[x][y].g = 0;
	celldetails[x][y].h = 0;
	celldetails[x][y].parent_i = x;
	celldetails[x][y].parent_j = y;

    return celldetails;
}

async function tracePath(cellDetails, endNode) {
	const splitEnd = splitID(endNode);
	let row = splitEnd[0];
	let col = splitEnd[1];

	let path = [];

	while (!( cellDetails[row][col].parent_i == row && cellDetails[row][col].parent_j == col )) {
		let cellID = "i" + row + '-' + col;
		path.push(cellID);
		let temp_row = cellDetails[row][col].parent_i;
		let temp_col = cellDetails[row][col].parent_j;
		row = temp_row;
		col = temp_col;
	}
	path.reverse();
	await lightThePathASTAR(path);
}

async function lightVisited(id) {
	let visitedElem = document.querySelector(`#${id}`);
	visitedElem.classList.add("visited-node");
	await delay(5);
	visitedElem.style.opacity = parseFloat(visitedElem.style.opacity) + 0.1;
}

export async function astar(grid, startNode, endNode) {
    const rowNumber = grid.length;
    const columnNumber = grid[0].length;
    const splitStart = splitID(startNode);
    let closedList = createClosedList(rowNumber, columnNumber);
    let cellDetails = createCellDetails(splitStart, rowNumber, columnNumber);
    let openList = new Map();

    openList.set(0, [Number(splitStart[0]), Number(splitStart[1])]);
    let foundDestination = false;

	let i, j, smallestkey = null, p;
    while (openList.size > 0) {
		smallestkey = null;
		openList.forEach((value, key, map) => {
			if(smallestkey === null || smallestkey > Number(key)) {
				smallestkey = Number(key);
			}
		});
		p = openList.get(smallestkey);

      	// Remove this vertex from the open list
		openList.delete(smallestkey);

      	// Add this vertex to the closed list
		i = Number(p[0]);
		j = Number(p[1]);
		let id = idJoiner(i, j);
		if(id !== startNode) {
			await lightVisited(id);
		}
		closedList[i][j] = true;

		let gNew, hNew, fNew;

		// NORTH
		if (isValid(i - 1, j, rowNumber, columnNumber) === true) {
			if (isDestination(i - 1, j, endNode) === true) {
				cellDetails[i - 1][j].parent_i = i;
				cellDetails[i - 1][j].parent_j = j;
				foundDestination = true;
			}
			else if ( closedList[i - 1][j] === false && isUnblocked(grid, i - 1, j) === true ) {
				gNew = cellDetails[i][j].g + 1;
				hNew = calculateHValue(i - 1, j, endNode);
				fNew = Number(gNew) + Number(hNew);
				if ( cellDetails[i - 1][j].f == 2147483647 || cellDetails[i - 1][j].f > fNew ) {
					openList.set(Number(fNew), [i - 1, j]);
					cellDetails[i - 1][j].f = Number(fNew);
					cellDetails[i - 1][j].g = Number(gNew);
					cellDetails[i - 1][j].h = Number(hNew);
					cellDetails[i - 1][j].parent_i = i;
					cellDetails[i - 1][j].parent_j = j;
				}
			}
		}
		// SOUTH
		if (isValid(i + 1, j, rowNumber, columnNumber) === true) {
			if (isDestination(i + 1, j, endNode) === true) {
				cellDetails[i + 1][j].parent_i = i;
				cellDetails[i + 1][j].parent_j = j;
				foundDestination = true;
			}
			else if ( closedList[i + 1][j] === false && isUnblocked(grid, i + 1, j) === true ) {
				gNew = cellDetails[i][j].g + 1;
				hNew = calculateHValue(i + 1, j, endNode);
				fNew = Number(gNew) + Number(hNew);
				if ( cellDetails[i + 1][j].f == 2147483647 || cellDetails[i + 1][j].f > fNew ) {
					openList.set(Number(fNew), [i + 1, j]);
					cellDetails[i + 1][j].f = Number(fNew);
					cellDetails[i + 1][j].g = Number(gNew);
					cellDetails[i + 1][j].h = Number(hNew);
					cellDetails[i + 1][j].parent_i = i;
					cellDetails[i + 1][j].parent_j = j;
				}
			}
		}
		// EAST
		if (isValid(i, j + 1, rowNumber, columnNumber) === true) {
			if (isDestination(i, j + 1, endNode) === true) {
				cellDetails[i][j + 1].parent_i = i;
				cellDetails[i][j + 1].parent_j = j;
				foundDestination = true;
			}
			else if ( closedList[i][j + 1] === false && isUnblocked(grid, i, j + 1) === true ) {
				gNew = cellDetails[i][j].g + 1;
				hNew = calculateHValue(i, j + 1, endNode);
				fNew = Number(gNew) + Number(hNew);
				if ( cellDetails[i][j + 1].f == 2147483647 || cellDetails[i][j + 1].f > fNew ) {
					openList.set(Number(fNew), [i, j + 1]);
					cellDetails[i][j + 1].f = Number(fNew);
					cellDetails[i][j + 1].g = Number(gNew);
					cellDetails[i][j + 1].h = Number(hNew);
					cellDetails[i][j + 1].parent_i = i;
					cellDetails[i][j + 1].parent_j = j;
				}
			}
		}
		// WEST
		if (isValid(i, j - 1, rowNumber, columnNumber) === true) {
			if (isDestination(i, j - 1, endNode) === true) {
				cellDetails[i][j - 1].parent_i = i;
				cellDetails[i][j - 1].parent_j = j;
				foundDestination = true;
			}
			else if ( closedList[i][j - 1] === false && isUnblocked(grid, i, j - 1) === true ) {
				gNew = cellDetails[i][j].g + 1;
				hNew = calculateHValue(i, j - 1, endNode);
				fNew = Number(gNew) + Number(hNew);
				if ( cellDetails[i][j - 1].f == 2147483647 || cellDetails[i][j - 1].f > fNew ) {
					openList.set(Number(fNew), [i, j - 1]);
					cellDetails[i][j - 1].f = Number(fNew);
					cellDetails[i][j - 1].g = Number(gNew);
					cellDetails[i][j - 1].h = Number(hNew);
					cellDetails[i][j - 1].parent_i = i;
					cellDetails[i][j - 1].parent_j = j;
				}
			}
		}
		// NORTH EAST
		if (isValid(i - 1, j + 1, rowNumber, columnNumber) == true && (grid[i - 1][j] !== 0 || grid[i][j + 1] !== 0)) {
			if (isDestination(i - 1, j + 1, endNode) == true) {
				cellDetails[i - 1][j + 1].parent_i = i;
				cellDetails[i - 1][j + 1].parent_j = j;
				foundDestination = true;
			}
			else if ( closedList[i - 1][j + 1] == false && isUnblocked(grid, i - 1, j + 1) == true ) {
				gNew = cellDetails[i][j].g + 1.414;
				hNew = calculateHValue(i - 1, j + 1, endNode);
				fNew = gNew + hNew;
				if ( cellDetails[i - 1][j + 1].f == 2147483647 || cellDetails[i - 1][j + 1].f > fNew ) {
					openList.set(fNew, [i - 1, j + 1]);
					cellDetails[i - 1][j + 1].f = fNew;
					cellDetails[i - 1][j + 1].g = gNew;
					cellDetails[i - 1][j + 1].h = hNew;
					cellDetails[i - 1][j + 1].parent_i = i;
					cellDetails[i - 1][j + 1].parent_j = j;
				}
			}
		}
		// NORTH WEST
		if (isValid(i - 1, j - 1, rowNumber, columnNumber) == true && (grid[i - 1][j] !== 0 || grid[i][j - 1] !== 0)) {
			if (isDestination(i - 1, j - 1, endNode) == true) {
				cellDetails[i - 1][j - 1].parent_i = i;
				cellDetails[i - 1][j - 1].parent_j = j;
				foundDestination = true;
			}
			else if ( closedList[i - 1][j - 1] == false && isUnblocked(grid, i - 1, j - 1) == true ) {
				gNew = cellDetails[i][j].g + 1.414;
				hNew = calculateHValue(i - 1, j - 1, endNode);
				fNew = gNew + hNew;
				if ( cellDetails[i - 1][j - 1].f == 2147483647 || cellDetails[i - 1][j - 1].f > fNew ) {
					openList.set(fNew, [i - 1, j - 1]);
					cellDetails[i - 1][j - 1].f = fNew;
					cellDetails[i - 1][j - 1].g = gNew;
					cellDetails[i - 1][j - 1].h = hNew;
					cellDetails[i - 1][j - 1].parent_i = i;
					cellDetails[i - 1][j - 1].parent_j = j;
				}
			}
		}
		// SOUTH EAST
		if (isValid(i + 1, j + 1, rowNumber, columnNumber) == true && (grid[i + 1][j] !== 0 || grid[i][j + 1] !== 0)) {
			if (isDestination(i + 1, j + 1, endNode) == true) {
				cellDetails[i + 1][j + 1].parent_i = i;
				cellDetails[i + 1][j + 1].parent_j = j;
				foundDestination = true;
			}
			else if ( closedList[i + 1][j + 1] == false && isUnblocked(grid, i + 1, j + 1) == true ) {
				gNew = cellDetails[i][j].g + 1.414;
				hNew = calculateHValue(i + 1, j + 1, endNode);
				fNew = gNew + hNew;
				if ( cellDetails[i + 1][j + 1].f == 2147483647 || cellDetails[i + 1][j + 1].f > fNew ) {
					openList.set(fNew, [i + 1, j + 1]);
					cellDetails[i + 1][j + 1].f = fNew;
					cellDetails[i + 1][j + 1].g = gNew;
					cellDetails[i + 1][j + 1].h = hNew;
					cellDetails[i + 1][j + 1].parent_i = i;
					cellDetails[i + 1][j + 1].parent_j = j;
				}
			}
		}
		// SOUTH WEST
		if (isValid(i + 1, j - 1, rowNumber, columnNumber) == true && (grid[i + 1][j] !== 0 || grid[i][j - 1] !== 0)) {
			if (isDestination(i + 1, j - 1, endNode) == true) {
				cellDetails[i + 1][j - 1].parent_i = i;
				cellDetails[i + 1][j - 1].parent_j = j;
				foundDestination = true;
			}
			else if ( closedList[i + 1][j - 1] == false && isUnblocked(grid, i + 1, j - 1) == true ) {
				gNew = cellDetails[i][j].g + 1.414;
				hNew = calculateHValue(i + 1, j - 1, endNode);
				fNew = gNew + hNew;
				if ( cellDetails[i + 1][j - 1].f == 2147483647 || cellDetails[i + 1][j - 1].f > fNew ) {
					openList.set(fNew, [i + 1, j - 1]);
					cellDetails[i + 1][j - 1].f = fNew;
					cellDetails[i + 1][j - 1].g = gNew;
					cellDetails[i + 1][j - 1].h = hNew;
					cellDetails[i + 1][j - 1].parent_i = i;
					cellDetails[i + 1][j - 1].parent_j = j;
				}
			}
		}
		if(foundDestination === true) {
			break;
		}
	}

	if (foundDestination == false)
        alert("Failed to find a path");
	else
		await tracePath(cellDetails, endNode);

    return;
}
