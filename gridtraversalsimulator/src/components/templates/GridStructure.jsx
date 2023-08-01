import { SimpleGrid } from "../grid/SimpleGrid"

export default function GridStructure({ rows, columns, changes, setChanges, gridContent, setGridContent }) {
    const gridWrapperStyle = {
        margin: "1%",
    }

    if(changes){
        return (
            <div style={gridWrapperStyle}>
                <SimpleGrid rows={rows} columns={columns} changes={changes} setChanges={setChanges} gridContent={gridContent} setGridContent={setGridContent} />
            </div>
        )
    } else {
        return null;
    }
}
