import React from 'react';

import { GridSize } from './GridSize';
import { GridPointer } from './GridPointer';

import '../styles/wrapper.css';

export function SettingsBar() {
    return (
        <div className='wrapper'>
            <GridSize />
            <GridPointer />
        </div>
    )
}