function handleAlgorithmChange(event, selectedValue) {
    sessionStorage.setItem("algo", `${selectedValue}`)
    console.log("Selected algorithm:", sessionStorage.getItem('algo'));
}