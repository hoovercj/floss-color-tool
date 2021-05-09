import * as React from 'react';
import { HashLink } from 'react-router-hash-link';
import { Color } from '../../Models/color';


interface CloseColorRowProps {
    color: Color;
    closeColor: Color;
    visible: boolean;
    brand: string;
}

export const CloseColorRow = (props: CloseColorRowProps) => {
    const { brand, closeColor, color, visible } = props;
    return visible ? (
        <div className='row inner'>
            <div className='col-2 text-center vertically-centered'><HashLink smooth to={`/${brand.toLowerCase()}#${closeColor.number}`}>{closeColor.number}</HashLink></div>
            <div className='col-4 vertically-centered'>{closeColor.description}</div>
            <div className='col-3' style={{backgroundColor: '#' + closeColor.rgbCode, minHeight: '38px'}} />
            <div className='col-3' style={{backgroundColor: '#' + color.rgbCode, minHeight: '38px'}} />
        </div>
    ) : null;
}
