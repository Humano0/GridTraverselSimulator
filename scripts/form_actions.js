function splitID (id) {
	const splittedID = id.slice(1).split('-');
    return splittedID;
}
function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function handleGridClick (event) {
    const nodeSelector = sessionStorage.getItem('node_type');

    const snode = sessionStorage.getItem('startnode');
    const enode = sessionStorage.getItem('endnode');

    const isStart = event.target.classList.contains("startingnode");
    const isBlock = event.target.classList.contains("blockingnode");
    const isEnd = event.target.classList.contains("endingnode");

    const grid = JSON.parse(sessionStorage.getItem('gridcells'));
    /*
        gridcells --> 0, 1, 2, 3
            0 === blocked node
            1 === open node
            2 === start node
            3 === end node
    */
    let idsplit = splitID(event.target.id);
    let x = idsplit[0];
    let y = idsplit[1];
    if(sessionStorage.getItem('simulated')) {
        clear();
    }
    if(nodeSelector !== null && nodeSelector !== undefined){
        switch(nodeSelector) {
            case 'start':
                if(snode === 'io-o' && !isBlock && !isEnd) {
                    grid[x][y] = 2;
                    event.target.classList.add('startingnode');
                    sessionStorage.setItem('startnode', event.target.id);
                    sessionStorage.setItem('gridcells', JSON.stringify(grid));
                } else if (isBlock || isEnd) {
                    return;
                } else {
                    grid[x][y] = 2;
                    let oldstartnode = document.querySelector('.startingnode');
                    oldstartnode.classList.remove('startingnode');
                    idsplit = splitID(oldstartnode.id);
                    grid[idsplit[0]][idsplit[1]] = 1;
                    event.target.classList.add('startingnode');
                    sessionStorage.setItem('startnode', event.target.id);
                    sessionStorage.setItem('gridcells', JSON.stringify(grid));
                }
                break;
            case 'block':
                let existingBlockNodes = JSON.parse(sessionStorage.getItem('blocknode'));
                if(!existingBlockNodes.includes(event.target.id) && !isStart && !isEnd) {
                    grid[x][y] = 0;
                    event.target.classList.add('blockingnode');
                    existingBlockNodes.push(event.target.id);
                    sessionStorage.setItem('blocknode', JSON.stringify(existingBlockNodes));
                    sessionStorage.setItem('gridcells', JSON.stringify(grid));
                } else if(existingBlockNodes.includes(event.target.id)) {
                    grid[x][y] = 1;
                    existingBlockNodes.splice(existingBlockNodes.indexOf(event.target.id), 1);
                    event.target.classList.remove('blockingnode');
                    sessionStorage.setItem('blocknode', JSON.stringify(existingBlockNodes));
                    sessionStorage.setItem('gridcells', JSON.stringify(grid));
                }
                break;
            case 'end':
                if(enode === 'io-o' && !isStart && !isBlock) {
                    grid[x][y] = 3;
                    event.target.classList.add('endingnode');
                    sessionStorage.setItem('endnode', event.target.id);
                    sessionStorage.setItem('gridcells', JSON.stringify(grid));
                } else if (isBlock || isStart) {
                    return;
                } else {
                    grid[x][y] = 3;
                    let oldendnode = document.querySelector('.endingnode');
                    oldendnode.classList.remove('endingnode');
                    idsplit = splitID(oldendnode.id);
                    grid[idsplit[0]][idsplit[1]] = 1;
                    event.target.classList.add('endingnode');
                    sessionStorage.setItem('endnode', event.target.id);
                    sessionStorage.setItem('gridcells', JSON.stringify(grid));
                }
                break;
            default:
                break;
        }
    }
}

function saveGridArray(rownum, colnum) {
    let arr = [];
    for(let i = 0; i < rownum; i++) {
        arr[i] = [];
        for(let j = 0; j < colnum; j++) {
            arr[i][j] = 1;
        }
    }
    sessionStorage.setItem('gridcells', JSON.stringify(arr));
}
function setRowAndCol(rownum, colnum) {
    sessionStorage.setItem('row_number', rownum);
    sessionStorage.setItem('column_number', colnum);
}
function buttonClassChanger(buttonClass) {
    switch (buttonClass) {
        case 'start-node-selector':
            sessionStorage.setItem('node_type', 'start');
            break;
        case 'block-node-selector':
            sessionStorage.setItem('node_type', 'block');
            break;
        case 'end-node-selector':
            sessionStorage.setItem('node_type', 'end');
            break;
        default:
            break;
    }
}
function defaultNodes() {
    let arr = [""];
    sessionStorage.setItem('blocknode', JSON.stringify(arr));
    sessionStorage.setItem('startnode', 'io-o');
    sessionStorage.setItem('endnode', 'io-o');
}

function createGridLayout(rownum, colnum) {
    const gridLayoutWrapper = $('.grid-layout-wrapper');
    gridLayoutWrapper.empty();

    for (let row = 0; row < rownum; row++) {
        for (let col = 0; col < colnum; col++) {
            const gridCell = document.createElement('div');
            gridCell.classList.add('grid-cell');
            gridCell.id = `i${row}-${col}`;
            gridCell.addEventListener('click', handleGridClick);
            gridLayoutWrapper.append(gridCell);
        }
    }

    gridLayoutWrapper.css({
        'display': 'grid',
        'grid-template-rows': `repeat(${rownum}, 1fr)`,
        'grid-template-columns': `repeat(${colnum}, 1fr)`,
        'gap': '1px'
    })
}
function createAdjacencyList(grid) {
	const adjacencyList = {};

	// Define directions (up, down, left, right)
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
function createVisitedArray(rownum, colnum) {
	let arr = [];
    for(let i = 0; i < rownum; i++) {
        arr[i] = [];
        for(let j = 0; j < colnum; j++) {
            arr[i][j] = false;
        }
    }
	return arr;
}
function createPreviousArray(rownum, colnum) {
	let arr = [];
    for(let i = 0; i < rownum; i++) {
        arr[i] = [];
        for(let j = 0; j < colnum; j++) {
            arr[i][j] = null;
        }
    }
	return arr;
}

function disableForm(formElements) {
    $(formElements).prop('disabled', true);
}
function enableForm(formElements) {
    $(formElements).prop('disabled', false);
}

async function lightThePath(path) {
    for (let x = 1; x < path.length - 1; x++) {
		await delay(25);
        let pathElement = document.body.querySelector(`#${path[x]}`);
		pathElement.classList.remove('visited-node');
        pathElement.classList.add('path-elem');
    }
}

/*
    *******BFS*******
    *******BFS*******
    *******BFS*******
    *******BFS*******
    *******BFS*******
*/
async function solveBFS(startnode, adjacencyList, rownumber, columnnumber, endnode) {
    let breaker = false;
    let queue = [];
    queue.push(startnode);

    let visited = createVisitedArray(rownumber, columnnumber);
    let id = splitID(startnode);
    visited[id[0]][id[1]] = true;

    let prev = createPreviousArray(rownumber, columnnumber);

    while (queue.length) {
        let node = queue.shift();
        let neighbours = adjacencyList[node];
        for (let next of neighbours) {
            let id = splitID(next);
            let visitedElem = document.querySelector(`#${next}`);
            if (visitedElem.id !== startnode && visitedElem.id !== endnode) {
                visitedElem.classList.add('visited-node');
                // Delay for a smoother effect
                await delay(5);
                // Increment the opacity (e.g., by 0.1 each time)
                visitedElem.style.opacity = parseFloat(visitedElem.style.opacity) + 0.1;
            }
            if (!visited[id[0]][id[1]]) {
                queue.push(next);
                visited[id[0]][id[1]] = true;
                prev[id[0]][id[1]] = node;
            }
            if (next == endnode) {
                breaker = true;
                break;
            }
        }
        if (breaker) {
            break;
        }
    }
    return prev;
}
// startnode && endnode == id of the elements
// prev == two dimensional array with ids
async function reconstructPathBFS (startnode, endnode, prev) {
	let path = [];
	let at = splitID(endnode);

	// save the path to path array
	for(let pos = endnode; pos != null; pos = prev[at[0]][at[1]]) {
		at = splitID(pos);
		path.push(pos);
	}
	path.reverse();

	if(path[0] == startnode) {
		await lightThePath(path);
	} else {
		console.log('no path found');
	}
}
// startnode = id of starting node
// endnode = id of ending node
async function bfs (grid, startnode, endnode) {
	const adjacencyList = createAdjacencyList(grid);
    const prev = await solveBFS(startnode, adjacencyList, grid.length, grid[0].length, endnode);

	await reconstructPathBFS(startnode, endnode, prev);
}


/*
    *******DFS*******
    *******DFS*******
    *******DFS*******
    *******DFS*******
    *******DFS*******
*/
// DFS broken
async function solveDFS(startnode, endnode, adjacencyList, visited, rownumber, columnnumber, ) {
    let stack = [];
    let breaker = false;
    let id = splitID(startnode);
    stack.push(startnode);
    visited[id[0]][id[1]] = true;
    let prev = createPreviousArray(rownumber, columnnumber);

    while(stack.length) {
        let node = stack.pop();
        const neighbors = adjacencyList[node];
        if(neighbors != null) {
            for(let next of neighbors) {
                console.log(next);
                let nextid = splitID(next);
                let visitedElem = document.querySelector(`#${next}`);
                if (visitedElem.id !== startnode && visitedElem.id !== endnode) {
                    visitedElem.classList.add('visited-node');
                    // Delay for a smoother effect
                    await delay(10);
                    // Increment the opacity (e.g., by 0.1 each time)
                    visitedElem.style.opacity = parseFloat(visitedElem.style.opacity) + 0.1;
                }
                if(!visited[nextid[0]][nextid[1]]) {
                    stack.push(next);
                    visited[nextid[0]][nextid[1]] = true;
                    prev[nextid[0]][nextid[1]] = node;
                }
                if(next === endnode) {
                    prev[nextid[0]][nextid[1]] = node;
                    breaker = true;
                    break;
                }
            }
        }
        if(breaker) {
            break;
        }
    }
    return prev;
}
async function reconstructPathDFS(startnode, endnode, prev, lightElementCallback) {
    let path = [];
    let at = splitID(endnode);

    for (let pos = endnode; pos != null; pos = prev[at[0]][at[1]]) {
        at = splitID(pos);
        path.push(pos);
    }
    path.reverse();

    if (path[0] == startnode) {
        await lightThePath(path);
    } else {
        console.log('no path found');
    }
}
async function dfs(grid, startnode, endnode) {
    const rownumber = grid.length;
    const columnnumber = grid[0].length;
    const adjacencyList = createAdjacencyList(grid);
    let visited = createVisitedArray(rownumber, columnnumber);

    const prev = await solveDFS(startnode, endnode, adjacencyList, visited, rownumber, columnnumber);
    console.log(prev);
    await reconstructPathDFS(startnode, endnode, prev);
}

function clear() {
    const gridElements = document.querySelectorAll('.grid-cell');
    gridElements.forEach((element) => {
        if (element.classList.contains('path-elem') || element.classList.contains('visited-node')) {
            element.classList.remove('path-elem', 'visited-node');
        }
    })
}

async function simulateButton() {
    const algo = sessionStorage.getItem('selected_algorithm');
    const grid = JSON.parse(sessionStorage.getItem('gridcells'));
    const startNode = sessionStorage.getItem('startnode');
    const endNode = sessionStorage.getItem('endnode');
    if(sessionStorage.getItem('simulated')) {
        clear();
    }
    disableForm($('button, input, select'));
    if(algo !== null && grid !== null && startNode !== 'io-o' && endNode !== 'io-o' ) {
        switch(algo) {
            case 'bfs':
                await bfs(grid, startNode, endNode);
                break;
            case 'dfs':
                await dfs(grid, startNode, endNode);
                break;
        }
    } else {
        let errormessage = "Missing:";
        if(algo === null) {
            errormessage += " algorithm,"
        }
        if(grid === null) {
            errormessage += " grid layout,"
        }
        if(startNode === 'io-o') {
            errormessage += " starting node,"
        }
        if(endNode === 'io-o') {
            errormessage += " ending node,"
        }
        errormessage = errormessage.slice(0, -1) + '.';
        alert(errormessage);
    }
    enableForm($('button, input, select'));
}

async function clearGrid() {
    const gridElements = document.querySelectorAll('.grid-cell');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const grid = JSON.parse(sessionStorage.getItem('gridcells'));

    sessionStorage.setItem('simulated', false);

    gridElements.forEach(element => {
        if (element.classList.contains('path-elem') || element.classList.contains('visited-node')) {
            element.classList.remove('path-elem', 'visited-node');
        }
        let id = splitID(element.id);
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const value = checkbox.value;
                if (value === 'snode' && element.classList.contains('startingnode')) {
                    element.classList.remove('startingnode');
                    sessionStorage.setItem('startnode', 'io-o');
                    grid[id[0]][id[1]] = 1;
                } else if (value === 'bnode' && element.classList.contains('blockingnode')) {
                    element.classList.remove('blockingnode');
                    let arr = [""];
                    sessionStorage.setItem('blocknode', JSON.stringify(arr));
                    grid[id[0]][id[1]] = 1;
                } else if (value === 'enode' && element.classList.contains('endingnode')) {
                    element.classList.remove('endingnode');
                    sessionStorage.setItem('endnode', 'io-o');
                    grid[id[0]][id[1]] = 1;
                }
            }
        });
    });
    sessionStorage.setItem('gridcells', JSON.stringify(grid));
}

$(document).ready(function() {
    $('.size-apply').click(function() {
        const rowNumberValue = $('#row').val();
        const columnNumberValue = $('#column').val();

        setRowAndCol(rowNumberValue, columnNumberValue);
        defaultNodes();

        const rownum = sessionStorage.getItem('row_number');
        const colnum = sessionStorage.getItem('column_number');

        saveGridArray(rownum, colnum);
        createGridLayout(rownum, colnum);
    });

    $('.start-node-selector, .block-node-selector, .end-node-selector').click(function() {
        var buttonClass = $(this).attr('class');
        buttonClassChanger(buttonClass);
    });

    $('#list-chooser').on('change', function() {
        let selectedValue = $(this).val();
        sessionStorage.setItem("selected_algorithm", selectedValue);
    });

    $('.simulate-button').click(function() {
        simulateButton();
        sessionStorage.setItem('simulated', true);
    });

	$('.clear-grid-button').click(function() {
		clearGrid();
	})
});