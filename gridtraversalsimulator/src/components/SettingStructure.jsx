import AlgoChooser from "./settings/AlgoChooser.jsx";
import NodeSelector from "./settings/NodeSelector.jsx";
import Simulate from "./settings/Simulate.jsx";
import Sizer from "./settings/Sizer.jsx";
//import $ from "jquery";

export default function SettingStructure() {
    const settingsStyle = {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "20%",
        border: "1px solid black",
    }
    return (
        <div style={settingsStyle}>
            <Sizer />
            <NodeSelector />
            <AlgoChooser />
            <Simulate />
        </div>
    )
}