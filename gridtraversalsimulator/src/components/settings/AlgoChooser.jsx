import React, { useState } from 'react';

export default function AlgoChooser() {
  // Define your list of options here
  const options = [
    'Breadth First Search',
    'Depth First Search',
    'Option 3',
    'Option 4',
    // Add more options as needed
  ];

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  console.log(selectedOption, handleOptionChange.value);

  return (
    <div>
      <label htmlFor="list-chooser">Select an algorithm:</label>
      <select
        id="list-chooser"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="">-- algorithm --</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      { /*selectedOption && <p>You selected: {selectedOption}</p> */ }
    </div>
  );
}
