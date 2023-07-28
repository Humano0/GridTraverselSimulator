import React from 'react';

export function SimpleGrid({ rows, columns }) {
  const gridContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    backgroundColor: 'lightgray', // Change the background color of the grid
  };

  const gridItemStyle = {
    flexBasis: `calc(100% / ${columns} - 10px)`, // Adjust the width of grid items based on the number of columns
    height: '100px', // Adjust the height of grid items as needed
    backgroundColor: 'white', // Change the background color of grid items
    border: '1px solid black', // Add a border around grid items
  };

  // Generate grid content dynamically using a loop
  const gridContent = [];
  for (let i = 0; i < rows * columns; i++) {
    gridContent.push(<div key={i} style={gridItemStyle}>{i + 1}</div>);
  }

  return <div style={gridContainerStyle}>{gridContent}</div>;
}
