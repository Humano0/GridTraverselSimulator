import { StartPointer } from "./StartPointer";
import { BlockPointer } from "./BlockPointer";
import { EndPointer } from "./EndPointer";

export function GridPointer() {
    return (
        <div>
            <StartPointer />
            <BlockPointer />
            <EndPointer />
        </div>
    )
}