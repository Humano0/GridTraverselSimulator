import AlgoChooser from "./settings/AlgoChooser.jsx";
import NodeSelector from "./settings/NodeSelector.jsx";
import Simulate from "./settings/Simulate.jsx";
import Sizer from "./settings/Sizer.jsx";

export default function SettingStructure() {
    const theme = {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "20%",
    }
    return (
        <div style={theme}>
            <Sizer />
            <NodeSelector />
            <AlgoChooser />
            <Simulate />
        </div>
    )
}