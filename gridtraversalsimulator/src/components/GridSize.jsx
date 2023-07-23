import '../styles/textbox.css'

export function GridSize() {
    return (
        <div className='container'>
            <div className='rowcontainer'>
                <textarea className='textbox' name="Row" id="rowtext" cols="10" rows="1"></textarea>
                <textarea className='textbox' name="Column" id="columntext" cols="10" rows="1"></textarea>
            </div>
            <div className='columncontainer'>
                <button id='savebutton'>Apply</button>
            </div>
        </div>
    )
}