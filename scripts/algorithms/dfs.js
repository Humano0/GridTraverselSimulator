import { createAdjacencyList, createPreviousArray, createVisitedArray } from '../grid_functions.js';
import { delay } from '../simple_functions.js';
import { lightThePathBFS } from '../light_the_path.js';
import { splitID } from '../simple_functions.js';

async function solveDFS(startnode, endnode, adjacencyList, visited, rownumber, columnnumber) {
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
                let nextid = splitID(next);
                let visitedElem = document.querySelector(`#${next}`);
                if (visitedElem.id !== startnode && visitedElem.id !== endnode) {
                    visitedElem.classList.add('visited-node');
                    await delay(10);
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
async function reconstructPathDFS(startnode, endnode, prev) {
    let path = [];
    let at = splitID(endnode);

    for (let pos = endnode; pos != null; pos = prev[at[0]][at[1]]) {
        at = splitID(pos);
        path.push(pos);
    }
    path.reverse();
    return path;
}
export async function dfs(grid, startnode, endnode) {
    const rownumber = grid.length;
    const columnnumber = grid[0].length;
    const adjacencyList = createAdjacencyList(grid);
    let visited = createVisitedArray(rownumber, columnnumber);

    const prev = await solveDFS(startnode, endnode, adjacencyList, visited, rownumber, columnnumber);
    const path = await reconstructPathDFS(startnode, endnode, prev);
    if(path) {
        await lightThePathBFS(path);
    } else {
        alert("No path found");
    }
}