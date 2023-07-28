import { SimpleGrid } from "../grid/SimpleGrid"

export default function GridStructure({ rows, columns }) {
    const gridWrapperStyle = {
        margin: "1%",
    }
    return (
        <div style={gridWrapperStyle}>
            <SimpleGrid rows={rows} columns={columns} />
        </div>
    )
}