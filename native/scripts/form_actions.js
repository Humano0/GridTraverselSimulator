function splitID (target) {
    const id = target.id;
    const splittedID = id.split('-');
    return splittedID;
}
function handleGridClick (event) {
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
    let idsplit = splitID(event.target);
    let x = idsplit[0] - 1;
    let y = idsplit[1] - 1;
    if(nodeSelector !== null && nodeSelector !== undefined){
        console.log(event.target.id, nodeSelector);
        switch(nodeSelector) {
            case 'start':
                if(snode === '0-0' && !isBlock && !isEnd) {
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
                    idsplit = splitID(oldstartnode);
                    grid[idsplit[0] - 1][idsplit[1] - 1] = 1;
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
                if(enode === '0-0' && !isStart && !isBlock) {
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
                    idsplit = splitID(oldendnode);
                    grid[idsplit[0] - 1][idsplit[1] - 1] = 1;
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
function createGridLayout(rownum, colnum) {
    const gridLayoutWrapper = $('.grid-layout-wrapper');
    gridLayoutWrapper.empty();

    for (let row = 1; row <= rownum; row++) {
        for (let col = 1; col <= colnum; col++) {
            const gridCell = document.createElement('div');
            gridCell.classList.add('grid-cell');
            gridCell.id = `${row}-${col}`;
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
    sessionStorage.setItem('startnode', '0-0');
    sessionStorage.setItem('endnode', '0-0');
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
        const algo = sessionStorage.getItem('selected_algorithm');
        const grid = sessionStorage.getItem('gridcells');
        console.log(grid);
        if(algo !== null && grid !== null) {
            switch(algo) {
                case 'bfs':
                    //bfs();
                    break;
                case 'dfs':
                    //dfs();
                    break;
            }
        } else {
            alert ("missing info");
        }
    })
});