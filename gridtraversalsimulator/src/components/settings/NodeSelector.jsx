import '../../styles/nodeSelector.css'
import { handleModeChange } from '../../scripts/handleModeChange'

export default function NodeSelector(setMode) {
    console.log(setMode + "lol")
    return (
        <div className='nodeSelectorWrapper'>
            <button id='1' onClick={(event) => handleModeChange(event, setMode)}>Start Node</button>
            <button id='2' onClick={(event) => handleModeChange(event, setMode)}>Blockade Node</button>
            <button id='3' onClick={(event) => handleModeChange(event, setMode)}>End Node</button>
        </div>
    )
}