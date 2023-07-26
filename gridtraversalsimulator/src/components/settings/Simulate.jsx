export default function Simulate() {
    const outerDivStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        margin: "0 0 5% 0"
    }
    return (
        <div style={outerDivStyle}>
            <button>Simulate</button>
        </div>
    )
}