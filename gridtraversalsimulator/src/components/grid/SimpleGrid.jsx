import React, { useEffect, useState } from 'react';

export function SimpleGrid({ rows, columns, selectingMode }) {
    const createInitialGrids = (rows, columns) => {
        const newArray = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < columns; j++) {
                row.push(0); // Initialize with some default value
            }
            newArray.push(row);
        }
        return newArray;
    };

    const [grids, setGrids] = useState(createInitialGrids);

    useEffect(() => {
        setGrids(createInitialGrids(rows, columns));
    }, [rows, columns]);
    const gridContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px',
        backgroundColor: 'lightgray', // Change the background color of the grid
    };

    const gridItemStyle = {
        flexBasis: `calc(100% / ${columns} - 10px)`, // Adjust the width of grid items based on the number of columns
        width: '5px',
        height: '10px', // Adjust the height of grid items as needed
        backgroundColor: 'white', // Change the background color of grid items
        border: '1px solid black', // Add a border around grid items
        marginBottom: '3px',
    };
    return (
        <div style={gridContainerStyle}>
            {grids.map((row, i) => (
                <div key={i}>
                    {row.map((cell, j) => (
                        <div
                            key={`${i}-${j}`}
                            style={gridItemStyle}
                            onClick={() => {
                                const updatedGrids = [...grids];
                                updatedGrids[i][j] = (updatedGrids[i][j] + 1) % 2;
                                setGrids(updatedGrids);
                            }}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
}
