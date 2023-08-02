import React, { useState } from 'react';
import { handleAlgorithmChange } from '../../scripts/handleOptionChange';
import '../../styles/algoChooser.css'

export default function AlgoChooser({ selectedOption, setSelectedOption }) {
    // Add more options as needed
    const options = [
        'Breadth First Search',
        'Depth First Search',
    ];

    return (
        <div className='algoWrapperDiv'>
            <label htmlFor="list-chooser">Select an algorithm:</label>
            <select
                className='algoSelector'
                value={selectedOption}
                onChange={(event) => handleAlgorithmChange(event, setSelectedOption)}
            >
                <option value="">-- algorithm --</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
