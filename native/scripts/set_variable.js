$(document).ready(function() {
    $('.size-apply').click(function(event) {
        const rowNumberValue = $('#row').val();
        const columnNumberValue = $('#column').val();

        sessionStorage.setItem('row_number', rowNumberValue);
        sessionStorage.setItem('column_number', columnNumberValue);

        const rownum = sessionStorage.getItem('row_number');
        const colnum = sessionStorage.getItem('column_number');
        const gridLayoutWrapper = $('.grid-layout-wrapper');

        for (let row = 1; row <= rownum; row++) {
            for (let col = 1; col <= colnum; col++) {
                const gridCell = document.createElement('div');
                gridCell.classList.add('grid-cell');
                gridCell.id = `${row}-${col}`;
                gridLayoutWrapper.append(gridCell);
            }
        }

        gridLayoutWrapper.css({
            'display': 'grid',
            'grid-template-rows': `repeat(${rownum}, 1fr)`,
            'grid-template-columns': `repeat(${colnum}, 1fr)`,
            'gap': '1px'
        })
    });

    $('.start-node-selector, .block-node-selector, .end-node-selector').click(function() {
        var buttonClass = $(this).attr('class');

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
    });

    $('#list-chooser').on('change', function() {
        let selectedValue = $(this).val();
        sessionStorage.setItem("selected_algorithm", selectedValue);
    });
});