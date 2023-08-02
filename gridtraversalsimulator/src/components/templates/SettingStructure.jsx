import React from 'react';

import AlgoChooser from '../settings/AlgoChooser';
import NodeSelector from '../settings/NodeSelector';
import Simulate from '../settings/Simulate';
import Sizer from '../settings/Sizer';

import '../../styles/settingStructure.css'

export default function SettingStructure({ setRowValue, setColumnValue, setSelectingMode, selectedOption, setSelectedOption }) {
    return (
        <div className='settingsWrapper'>
            <Sizer
                setRowValue={setRowValue}
                setColumnValue={setColumnValue}
            />
            <NodeSelector
                setSelectingMode={setSelectingMode}
            />
            <AlgoChooser
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />
            <Simulate />
        </div>
    );
}