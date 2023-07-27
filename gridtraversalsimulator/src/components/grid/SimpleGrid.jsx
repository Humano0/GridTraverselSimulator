import React from 'react';

export default function SimpleGrid() {
  const squareSize = '3%'; // Adjust this value to change the size of the square

  const squareStyle = {
    width: squareSize,
    height: squareSize,
    backgroundColor: 'blue',
  };

  return (
    <div style={squareStyle}>
      {/* Content inside the square, if needed */}
    </div>
  );
}
