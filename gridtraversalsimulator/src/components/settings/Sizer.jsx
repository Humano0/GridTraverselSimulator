import React, { useState } from 'react';

export default function Sizer() {
    const [rowValue, setRowValue] = useState('');
    const [columnValue, setColumnValue] = useState('');

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

    const outerDivStyle = {
        display: "flex",
        flexDirection: "row",
    }

    const inputStyle = {
        display: "flex",
        flexDirection: "column", // Change to "column" for vertical stacking
        alignItems: "center", // Align items horizontally in the center
        margin: "5%",
        flexBasis: "50%",
    };

    const buttonStyle = {
        display: "flex",
        flexDirection: "row",
        flexBasis: "50%",
        justifyContent: "center",
        alignItems: "center",
    };

    const inputWidth = { width:"100%", margin: "2%" };

    return (
        <div style={outerDivStyle}>
            <div style={inputStyle}>
                <input
                    type="number"
                    min="2"
                    max="100"
                    placeholder="row"
                    style={inputWidth}
                    onInput={(event) => handleChange(event, setRowValue)}
                />
                <input
                    type="number"
                    min="2"
                    max="100"
                    placeholder="column"
                    style={inputWidth}
                    onInput={(event) => handleChange(event, setColumnValue)}
                />
            </div>
            <div style={buttonStyle}>
                <button>Apply</button>
            </div>
        </div>
    );
}