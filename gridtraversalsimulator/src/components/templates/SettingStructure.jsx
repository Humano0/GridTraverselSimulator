import React from 'react';
import AlgoChooser from '../settings/AlgoChooser';
import NodeSelector from '../settings/NodeSelector';
import Simulate from '../settings/Simulate';
import Sizer from '../settings/Sizer';

export default function SettingStructure({ setRowValue, setColumnValue, setChanges}) {
    return (
        <div className='settingsWrapper'>
            <Sizer
                setRowValue={setRowValue}
                setColumnValue={setColumnValue}
                setChanges={setChanges}
            />
            <NodeSelector />
            <AlgoChooser />
            <Simulate />
        </div>
    );
}
