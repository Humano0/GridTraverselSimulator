import '../../styles/sizer.css';
import { handleInputChange } from '../../scripts/handleInputChange';

export default function Sizer({ setRowValue, setColumnValue, setSelectingMode }) {
    return (
        <div className='outerDiv'>
            <div className='innerRowDiv'>
                <label htmlFor="rowInput">Row:</label>
                <input
                    type="number"
                    min="2"
                    max="50"
                    placeholder="Enter row number (2 - 50)"
                    onChange={(event) => handleInputChange(event, setRowValue)}
                />
            </div>
            <div className='innerRowDiv'>
                <label htmlFor="columnInput">Column:</label>
                <input
                    type="number"
                    min="2"
                    max="50"
                    placeholder="Enter column number (2 - 50)"
                    onChange={(event) => handleInputChange(event, setColumnValue)}
                />
            </div>
        </div>
    );
}
