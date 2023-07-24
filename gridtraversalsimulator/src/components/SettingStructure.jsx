import AlgoChooser from "./settings/AlgoChooser.jsx";
import NodeSelector from "./settings/NodeSelector.jsx";
import Sizer from "./settings/Sizer.jsx";

export default function SettingStructure() {
    return (
        <div className="settingstructure">
            <Sizer />
            <NodeSelector />
            <AlgoChooser />
        </div>
    )
}