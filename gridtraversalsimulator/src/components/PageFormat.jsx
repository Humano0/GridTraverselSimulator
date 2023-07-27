import GridStructure from "./templates/GridStructure";
import SettingStructure from "./templates/SettingStructure";

export default function MainStructure() {
    const wrapperDivStyle = {
        display: "flex",
        flexDirection: "row",
    }
    return (
        <div style={wrapperDivStyle}>
            <SettingStructure />
            <GridStructure />
        </div>
    )
}