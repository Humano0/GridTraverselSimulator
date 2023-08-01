import '../../styles/sizer.css';
import { handleInputChange } from '../../scripts/handleInputChange';

export default function Sizer({ setRowValue, setColumnValue }) {
    return (
        <div className='outerDiv'>
            <div className='innerRowDiv'>
                <label htmlFor="rowInput">Row:</label>
                <input
                    type="number"
                    min="2"
                    max="100"
                    placeholder="Enter row number (2 - 99)"
                    onChange={(event) => handleInputChange(event, setRowValue)}
                />
            </div>
            <div className='innerRowDiv'>
                <label htmlFor="columnInput">Column:</label>
                <input
                    type="number"
                    min="2"
                    max="100"
                    placeholder="Enter column number (2 - 99)"
                    onChange={(event) => handleInputChange(event, setColumnValue)}
                />
            </div>
        </div>
    );
}
