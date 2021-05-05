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
        <table className="table table-hover color-table table-borderless">
            <thead>
                <tr>
                    <th className="text-center">{brand} #</th>
                    <th className="text-center">Color</th>
                    <th>Name</th>
                    <th className="text-center" colSpan={5}>Closest Colors</th>
                </tr>
            </thead>
            {filteredColors.map((id: string) => {
                return <ColorRow key={id} brand={brand} color={colors[id]} colors={colors} />;
            })}
        </table>
    );
});
