import { createAdjacencyList, createPreviousArray, createVisitedArray } from '../grid_functions.js';
import { delay } from '../simple_functions.js';
import { lightThePathBFS } from '../light_the_path.js';
import { splitID } from '../simple_functions.js';

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
		await lightThePathBFS(path);
	} else {
		alert('No path found.');
	}
}
// startnode = id of starting node
// endnode = id of ending node
export async function bfs (grid, startnode, endnode) {
	const adjacencyList = createAdjacencyList(grid);
    const prev = await solveBFS(startnode, adjacencyList, grid.length, grid[0].length, endnode);

	await reconstructPathBFS(startnode, endnode, prev);
}