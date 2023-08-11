export function handleGridClick(event, selectingMode) {
    console.log(event.target.id)
    const clickedElement = event.target;
    console.log(clickedElement)
    if(selectingMode === 1) {
        clickedElement.classList.add('startNode');
    } else if(selectingMode === 2) {
        clickedElement.classList.add('blockNode');
    } else if(selectingMode === 3) {
        clickedElement.classList.add('endNode');
    } else {
        return;
    }
}