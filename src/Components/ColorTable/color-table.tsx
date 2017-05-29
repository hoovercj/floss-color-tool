import * as React from 'react';
import { ColorDistanceMatrix } from '../../Models/color';
import ColorRow from './color-row';
import './color-table.css';

interface ColorTableProps {
    colors: ColorDistanceMatrix;
}

export default class ColorTable extends React.Component<ColorTableProps, {}> {

    render() {
        return (
            <table className="table table-hover color-table table-borderless">
                <thead>
                    <tr>
                        <th className="text-center">DMC #</th>
                        <th className="text-center">Color</th>
                        <th>Name</th>
                        <th className="text-center" colSpan={5}>Closest Colors</th>
                    </tr>
                </thead>
                {Object.keys(this.props.colors).map((id: string) => {
                    return <ColorRow key={id} color={this.props.colors[id]} colors={this.props.colors} />;
                })}
            </table>
        );
    }
}
