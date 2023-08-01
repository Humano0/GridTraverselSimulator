import GridStructure from "./templates/GridStructure";
import SettingStructure from "./templates/SettingStructure";
import { useState } from "react";
import '../styles/mainStructure.css';

export default function MainStructure() {
    const [rowValue, setRowValue] = useState(2);
    const [columnValue, setColumnValue] = useState(2);
    const [mode, setMode] = useState(0);
    const [gridContent, setGridContent] = useState([]);

    return (
        <div className="mainStructureWrapper">
            <SettingStructure
                setRowValue={setRowValue}
                setColumnValue={setColumnValue}
                setMode={setMode}
            />
            <GridStructure
                rows={rowValue}
                columns={columnValue}
                //selectingMode={mode}
                gridContent={gridContent}
                setGridContent={setGridContent}
            />
        </div>
    );
}
