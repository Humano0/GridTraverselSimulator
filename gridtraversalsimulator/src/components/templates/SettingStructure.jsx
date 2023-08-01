import React from 'react';
import AlgoChooser from '../settings/AlgoChooser';
import NodeSelector from '../settings/NodeSelector';
import Simulate from '../settings/Simulate';
import Sizer from '../settings/Sizer';

export default function SettingStructure({ setRowValue, setColumnValue, setSelectingMode }) {
    return (
        <div className='settingsWrapper'>
            <Sizer
                setRowValue={setRowValue}
                setColumnValue={setColumnValue}
            />
            <NodeSelector
                setSelectingMode={setSelectingMode}
            />
            <AlgoChooser />
            <Simulate />
        </div>
    );
}
