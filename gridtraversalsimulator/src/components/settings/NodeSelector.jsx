import '../../styles/nodeSelector.css'

export default function NodeSelector(setSelectingMode) {
    const handleChangeSelectingMode = (event) => {
        if(event.target.id === 1) {
            setSelectingMode(1);
        } else if(event.target.id === 2) {
            setSelectingMode(2);
        } else if(event.target.id === 3) {
            setSelectingMode(3);
        }
    }
    return (
        <div className='nodeSelectorWrapper'>
            <button id='1' onClick={(event) => handleChangeSelectingMode(event)}>Start Node</button>
            <button id='2' onClick={(event) => handleChangeSelectingMode(event)}>Blockade Node</button>
            <button id='3' onClick={(event) => handleChangeSelectingMode(event)}>End Node</button>
        </div>
    )
}