export default function Sizer() {
    const outerDivStyle = {
        display: "flex",
        flexDirection: "row",
    }

    const inputStyle = {
        display: "flex",
        flexDirection: "column", // Change to "column" for vertical stacking
        alignItems: "center", // Align items horizontally in the center
        justifyContent: "space-between", // Push the button to the right side
        margin: "10px",
    };

    const buttonStyle = {
        // No need for marginLeft now
        marginTop: "10px", // Add some margin to separate the button from inputs
        flex: "1 1 auto", // Make the button grow to fill the space
        flexDirection: "row"
    };

    return (
        <div style={outerDivStyle}>
            <div style={inputStyle}>
                <input type="number" min="2" max="100" placeholder="row" />
                <input type="number" min="2" max="100" placeholder="column" />
            </div>
            <div style={buttonStyle}>
                <button style={buttonStyle}>Apply</button>
            </div>
        </div>
    );
}
