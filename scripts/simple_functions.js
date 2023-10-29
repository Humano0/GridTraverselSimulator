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

export function clear() {
    const gridElements = document.querySelectorAll('.grid-cell');
    gridElements.forEach((element) => {
        if (element.classList.contains('path-elem') || element.classList.contains('visited-node')) {
            element.classList.remove('path-elem', 'visited-node');
        }
    })
}

export async function clearGrid() {
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