export function grid_creater(rownum, colnum) {
    const gridLayoutWrapper = $('.grid-layout-wrapper');
    gridLayoutWrapper.css({
        'display': 'grid',
        'grid-template-rows': `repeat(${rownum}, 1fr)`,
        'grid-template-columns': `repeat(${colnum}, 1fr)`,
        'gap': '1px'
    })

    const gridItems = gridLayoutWrapper.find('*');

    gridItems.css({
        'border': '1px solid black'
    })
}