import React, { useEffect, useState } from 'react';
import { handleGridClick } from "../../scripts/handleGridClick.js";
import "../../styles/simpleGrid.css";

export function SimpleGrid({ rows, columns, selectingMode }) {
    //const [startNode, setStartNode] = useState('');
    //const [blockNode, setBlockNode] = useState([]);
    //const [endNode, setEndNode] = useState('');
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '5px',
        backgroundColor: 'lightgray',
    };

    const gridItemStyle = {
        flexBasis: `calc(100% / ${columns} - 10px)`,
        width: '4px',
        height: '10px',
        backgroundColor: 'white',
        border: '1px solid black',
        marginBottom: '3px',
    };
    return (
        <div style={gridContainerStyle}>
            {Array.from({ length: columns }, (_, i) => (
                <div key={i + 1} id={i} onClick={(event) => handleGridClick(event, selectingMode)}>
                    {Array.from({ length: rows }, (_, j) => (
                        <div
                            id={`${j}-${i}`}
                            style={gridItemStyle}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
}
