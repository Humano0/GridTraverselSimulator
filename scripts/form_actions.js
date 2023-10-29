import { astar } from "./algorithms/astar.js";
import { dfs } from "./algorithms/dfs.js"
import { bfs } from './algorithms/bfs.js';
import { splitID, clear, clearGrid } from "./simple_functions.js";

let isMouseDown = false;
let lastClickedCell = null;

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

function addListenerGrid() {
    const gridLayoutWrapper = $('.grid-layout-wrapper');
    // Add event listeners for mouse events
    gridLayoutWrapper.on('mousedown', () => {
        isMouseDown = true;
    });
    gridLayoutWrapper.on('mouseup', () => {
        isMouseDown = false;
        lastClickedCell = null;
    });
    gridLayoutWrapper.on('mousemove', (event) => {
        if (isMouseDown) {
            const targetGridCell = event.target;
            if (targetGridCell.classList.contains('grid-cell') && targetGridCell !== lastClickedCell) {
                targetGridCell.click();
                lastClickedCell = targetGridCell;
            }
        }
    });
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
    });

    addListenerGrid();
}

function disableForm(formElements) {
    $(formElements).prop('disabled', true);
}
function enableForm(formElements) {
    $(formElements).prop('disabled', false);
}

async function simulateButton() {
    $('.grid-cell').addClass('non-interactable');
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
            case 'astar':
                await astar(grid, startNode, endNode);
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
    $('.grid-cell').removeClass('non-interactable');
    enableForm($('button, input, select'));
}



function isValidValue(value) {
    return !isNaN(value) && value >= 2 && value <= 50;
}

function sizeApply() {
    const rowNumberValue = $('#row').val();
    const columnNumberValue = $('#column').val();

    if (!isValidValue(rowNumberValue) || !isValidValue(columnNumberValue)) {
        alert('Please enter valid values between 2 and 50 for both rows and columns.');
        return;
    } else {
        setRowAndCol(rowNumberValue, columnNumberValue);
        defaultNodes();

        const rownum = sessionStorage.getItem('row_number');
        const colnum = sessionStorage.getItem('column_number');

        saveGridArray(rownum, colnum);
        createGridLayout(rownum, colnum);
    }
}

$(document).ready(function() {
    $('.size-apply').click(function() {
        sizeApply();
    });

    $('.start-node-selector, .block-node-selector, .end-node-selector').click(function() {
        let buttonClass = $(this).attr('class');
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