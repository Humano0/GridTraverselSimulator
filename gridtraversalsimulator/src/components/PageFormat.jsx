import GridStructure from "./templates/GridStructure";
import SettingStructure from "./templates/SettingStructure";
import { useState } from "react";

export default function MainStructure() {
    const [rowValue, setRowValue] = useState('');
    const [columnValue, setColumnValue] = useState('');
    const [gridCreated, setGridCreated] = useState(false);

    const handleChange = (event, setValue) => {
        let inputValue = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        // Restrict the input to two digits if it's greater than two
        if (isNaN(inputValue) || inputValue < 2) {
          inputValue = '';
        } else if (inputValue > 99) {
          inputValue = '99';
        }
        event.target.value = inputValue;
        setValue(inputValue);
    };

    const handleApplyClick = () => {
        if(rowValue && columnValue) {
            setGridCreated(true);
        } else {
            alert("Please enter both row and column values");
        }
    };

    const wrapperDivStyle = {
        display: "flex",
        flexDirection: "row",
    }
    return (
        <div style={wrapperDivStyle}>
            <SettingStructure
                rowValue={rowValue}
                setRowValue={setRowValue}
                columnValue={columnValue}
                setColumnValue={setColumnValue}
                handleApplyClick={handleApplyClick}
            />
            {gridCreated && <GridStructure rows={rowValue} columns={columnValue} />}
        </div>
    )
}