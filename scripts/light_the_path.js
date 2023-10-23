import { delay } from "./simple_functions.js";

export async function lightThePathBFS(path) {
    for (let x = 1; x < path.length - 1; x++) {
        await delay(25);
        let pathElement = document.body.querySelector(`#${path[x]}`);
        pathElement.classList.remove("visited-node");
        pathElement.classList.add("path-elem");
    }
}

export async function lightThePathASTAR(path) {
    for (let x = 0; x < path.length - 1; x++) {
        await delay(25);
        let pathElement = document.body.querySelector(`#${path[x]}`);
        pathElement.classList.remove("visited-node");
        pathElement.classList.add("path-elem");
    }
}
