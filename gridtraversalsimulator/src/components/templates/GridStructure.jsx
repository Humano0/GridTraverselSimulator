import { SimpleGrid } from "../grid/SimpleGrid"
import { memo } from "react";
import '../../styles/gridStructure.css'

const GridStructure = memo(function Grid({ rows, columns, selectingMode }) {
    return (
        <div className="gridStructureWrapper">
            <SimpleGrid rows={rows} columns={columns} selectingMode={selectingMode} />
        </div>
    )
});
export default GridStructure;