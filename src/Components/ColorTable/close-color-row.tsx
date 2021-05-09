import * as React from 'react';
import { Color } from '../../Models/color';

interface CloseColorRowProps {
    idForColor: (brand: string, color: Color) => string;
    brand: string;
    color: Color;
    closeColor: Color;
    visible: boolean;
}

export const CloseColorRow = (props: CloseColorRowProps) => {
    const { closeColor, color, visible, idForColor, brand } = props;
    return visible ? (
        <div className="row inner">
            <div className="col-xs-2 text-center vertically-centered"><a href={`#${idForColor(brand, closeColor)}`}>{closeColor.number}</a></div>
            <div className="col-xs-4 vertically-centered">{closeColor.description}</div>
            <div className="col-xs-3" style={{backgroundColor: '#' + closeColor.rgbCode, height: '38px'}} />
            <div className="col-xs-3" style={{backgroundColor: '#' + color.rgbCode, height: '38px'}} />
        </div>
    ) : null;
}
