export default function NodeSelector() {
    const outerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }
    const buttonStyle = {
        display: "flex",
        width: "60%",
        justifyContent: "center",
        margin: "2%",
    }
    return (
        <div style={outerStyle}>
            <button style={buttonStyle}>Start Node</button>
            <button style={buttonStyle}>Blockade Node</button>
            <button style={buttonStyle}>End Node</button>
        </div>
    )
}