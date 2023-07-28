import React from 'react';
import AlgoChooser from '../settings/AlgoChooser';
import NodeSelector from '../settings/NodeSelector';
import Simulate from '../settings/Simulate';
import Sizer from '../settings/Sizer';

export default function SettingStructure({ rowValue, columnValue, setRowValue, setColumnValue, handleApplyClick }) {
  const settingsStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '20%',
    border: '1px solid black',
    margin: '.3%',
  };
  return (
    <div style={settingsStyle}>
      {/* Pass the props down to the Sizer component */}
      <Sizer
        rowValue={rowValue}
        setRowValue={setRowValue}
        columnValue={columnValue}
        setColumnValue={setColumnValue}
        handleApplyClick={handleApplyClick}
      />
      <NodeSelector />
      <AlgoChooser />
      <Simulate />
    </div>
  );
}
