import * as React from 'react';
import { Color } from '../../Models/color';
import './color-row.css';

interface CloseColorRowProps {
    color: Color;
    closeColor: Color;
    visible: boolean;
}

export default class CloseColorRow extends React.Component<CloseColorRowProps, {}> {

    render() {

        const color: Color = this.props.color;
        const closeColor: Color = this.props.closeColor;
        return (
                    <tr>
                        <td className='text-center'>{color.Floss}</td>
                        <td>{color.Description}</td>
                        <td style={{backgroundColor: '#' + color.RGBcode}}></td>
                        <td style={{backgroundColor: '#' + closeColor.RGBcode}}></td>
                    </tr>
        );
    }
}
