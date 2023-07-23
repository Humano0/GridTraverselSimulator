const saveButton = document.getElementById('savebutton');
const rowtext = document.getElementById('rowtext');
const columntext = document.getElementById('columntext');

saveButton.addEventListener('click', function() {
  const value1 = parseInt(rowtext.value);
  const value2 = parseInt(columntext.value);

  if (Number.isNaN(value1) || value1 <= 2) {
    alert('Textbox 1 should be a positive integer greater than 2');
    return;
  }

  if (Number.isNaN(value2) || value2 <= 2) {
    alert('Textbox 2 should be a positive integer greater than 2');
    return;
  }

  // Perform actions with the valid captured values
  console.log('Textbox 1 value:', value1);
  console.log('Textbox 2 value:', value2);
});
