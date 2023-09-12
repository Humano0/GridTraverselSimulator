function splitID(event) {
    const id = event.target.id;
    const splittedID = id.split('-');
    return splittedID;
}

function handleGridClick(event) {
    const nodeSelector = sessionStorage.getItem('node_type');

    const snode = sessionStorage.getItem('startnode');
    const bnode = sessionStorage.getItem('blocknode');
    const enode = sessionStorage.getItem('endnode');

    const isStart = event.target.classList.contains("startingnode");
    const isBlock = event.target.classList.contains("blockingnode");
    const isEnd = event.target.classList.contains("endingnode");

    if(nodeSelector !== null && nodeSelector !== undefined){
        console.log(event.target.id, nodeSelector);
        switch(nodeSelector) {
            case 'start':
                if(snode === '0-0' && !isBlock && !isEnd) {
                    event.target.classList.add('startingnode');
                    sessionStorage.setItem('startnode', event.target.id);
                } else if (isBlock || isEnd) {
                    return 0;
                } else {
                    let oldstartnode = document.querySelector('.startingnode');
                    oldstartnode.classList.remove('startingnode');
                    event.target.classList.add('startingnode');
                    sessionStorage.setItem('startnode', event.target.id);
                }
                break;
            case 'block':
                if(!bnode.includes(event.target.id) && !isStart && !isEnd) {
                    event.target.classList.add('blockingnode');
                    sessionStorage.setItem('blocknode', event.target.id);
                }
                break;
            case 'end':
                if(enode === '0-0' && !isStart && !isBlock) {
                    event.target.classList.add('endingnode');
                    sessionStorage.setItem('endnode', event.target.id);
                } else if (isBlock || isStart) {
                    return 0;
                } else {
                    let oldendnode = document.querySelector('.endingnode');
                    oldendnode.classList.remove('endingnode');
                    event.target.classList.add('endingnode');
                    sessionStorage.setItem('endnode', event.target.id);
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
            arr[i][j] = "1";
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
    sessionStorage.setItem('startnode', '0-0');
    sessionStorage.setItem('blocknode', []);
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
});