import '../../styles/nodeSelector.css'
import { handleModeChange } from '../../scripts/handleModeChange'

export default function NodeSelector({ setSelectingMode }) {
    return (
        <div className='nodeSelectorWrapper'>
            <button id='1' onClick={(event) => handleModeChange(event, setSelectingMode)}>Start Node</button>
            <button id='2' onClick={(event) => handleModeChange(event, setSelectingMode)}>Blockade Node</button>
            <button id='3' onClick={(event) => handleModeChange(event, setSelectingMode)}>End Node</button>
        </div>
    )
}