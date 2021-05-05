import * as React from 'react';
import { ColorDistanceMatrix } from '../../Models/color';
import { ColorItem } from './color-item';
import './color-table.css';
import ColorDistances from '../../Resources/colorsDistanceMatrix.json';

interface ColorListState {
    colors: ColorDistanceMatrix;
}

export const ColorList = () => {
    const colors = ColorDistances as ColorDistanceMatrix;
    return (
        <div>
        <h1>DMC Color List</h1>
            {Object.keys(colors).map((id: string) => {
                return <ColorItem key={id} color={colors[id]} colors={colors} />;
            })}
        </div>
    );
}
