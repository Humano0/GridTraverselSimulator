export const handleInputChange = (event, setValue) => {
	let inputValue = event.target.value;

	// Use regular expression to filter out non-numeric characters
	inputValue = inputValue.replace(/\D/g, '');

	// Check if the input is a valid number (between 2 and 99)
	if (isNaN(inputValue) || inputValue < 2) {
		inputValue = 2;
	} else if (inputValue > 99) {
		inputValue = 99;
	}

	// Update the input field value and state value
	event.target.value = inputValue;
	setValue(inputValue);
};
