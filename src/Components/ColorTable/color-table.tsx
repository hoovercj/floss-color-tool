import * as React from 'react';
import { ColorDistanceMatrix } from '../../Models/color';
import { ColorRow } from './color-row';
import './color-table.css';

interface ColorTableProps {
    brand: string;
    colors: ColorDistanceMatrix;
    filteredColors: string[];
}

export const ColorTable = React.memo((props: ColorTableProps) => {
    const { brand, colors, filteredColors } = props;
    return (
        <table className='table color-table table-borderless'>
            <thead>
                <tr>
                    <th colSpan={4} className='text-center'>{brand} Color</th>
                    <th className='text-center' colSpan={6}>Substitutes</th>
                </tr>
            </thead>
            {filteredColors.map((id: string) => {
                return <ColorRow key={id} brand={brand} color={colors[id]} colors={colors} />;
            })}
        </table>
    );
});
