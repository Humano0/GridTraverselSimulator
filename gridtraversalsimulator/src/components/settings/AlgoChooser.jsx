import React, { useState } from 'react';

export default function AlgoChooser() {
    // Define your list of options here
    const options = [
        'Breadth First Search',
        'Depth First Search',
        // Add more options as needed
    ];

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const selectStyle = {
        marginLeft: "2%"
    }
    const wrapperDivStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        margin: "10% 0 10% 0"
    }
    return (
        <div style={wrapperDivStyle}>
            <label htmlFor="list-chooser">Select an algorithm:</label>
            <select
                id="list-chooser"
                value={selectedOption}
                onChange={handleOptionChange}
                style={selectStyle}
            >
                <option value="">-- algorithm --</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {/*selectedOption && <p>You selected: {selectedOption}</p>*/}
        </div>
    );
}
