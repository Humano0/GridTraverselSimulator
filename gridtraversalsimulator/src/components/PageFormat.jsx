import GridStructure from "./templates/GridStructure";
import SettingStructure from "./templates/SettingStructure";
import { useState } from "react";
import "../styles/mainStructure.css";

export default function MainStructure() {
  const [rowValue, setRowValue] = useState(2);
  const [columnValue, setColumnValue] = useState(2);
  //const [gridContent, setGridContent] = useState([]);

  return (
    <div className="wrapperDiv">
        <SettingStructure
            setRowValue={setRowValue}
            setColumnValue={setColumnValue}
        />
        {/*<GridStructure
            rows={rowValue}
            columns={columnValue}
            changes={changes}
            setChanges={setChanges}
            gridContent={gridContent}
            setGridContent={setGridContent}
        />*/}
    </div>
  );
}
