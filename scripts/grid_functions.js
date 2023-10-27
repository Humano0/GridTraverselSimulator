export function createAdjacencyList(grid) {
	const adjacencyList = {};
	const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

	for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
			if (grid[row][col] !== 0) {
				const node = `i${row}-${col}`;
				adjacencyList[node] = [];

				// Check adjacent cells
				for (const [dx, dy] of directions) {
					const newRow = row + dx;
					const newCol = col + dy;

					// Check if the adjacent cell is within bounds and traversable
					if (
						newRow >= 0 &&
						newRow < grid.length &&
						newCol >= 0 &&
						newCol < grid[newRow].length &&
						grid[newRow][newCol] !== 0
					) {
						adjacencyList[node].push(`i${newRow}-${newCol}`);
					}
				}
			}
        }
	}
	return adjacencyList;
}

export function createVisitedArray(rownum, colnum) {
	let arr = [];
    for(let i = 0; i < rownum; i++) {
        arr[i] = [];
        for(let j = 0; j < colnum; j++) {
            arr[i][j] = false;
        }
    }
	return arr;
}

export function createPreviousArray(rownum, colnum) {
	let arr = [];
    for(let i = 0; i < rownum; i++) {
        arr[i] = [];
        for(let j = 0; j < colnum; j++) {
            arr[i][j] = null;
        }
    }
	return arr;
}