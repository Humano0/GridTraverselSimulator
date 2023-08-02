import React from 'react';
import { useState } from 'react';

export function SimpleGrid({ rows, columns, selectingMode }) {
    const [grids, setGrids] = useState([]);

    const gridContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px',
        backgroundColor: 'lightgray', // Change the background color of the grid
    };

    const gridItemStyle = {
        flexBasis: `calc(100% / ${columns} - 10px)`, // Adjust the width of grid items based on the number of columns
        height: '10px', // Adjust the height of grid items as needed
        backgroundColor: 'white', // Change the background color of grid items
        border: '1px solid black', // Add a border around grid items
    };

    // Generate grid content dynamically using a loop
    const gridContent = [];
    for (let i = 0; i < rows; i++) {
        const row = []; // Initialize each row as an empty array
        for (let j = 0; j < columns; j++) {
            row.push(<div id={`${i}-${j}`} style={gridItemStyle}></div>);
        }
        gridContent.push(row); // Push the row (array of divs) to the 2D array
    }
    console.log(gridContent)
    //setGrids(gridContent);

    return <div style={gridContainerStyle}>{gridContent}</div>;
}
