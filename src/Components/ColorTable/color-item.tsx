import * as React from 'react';
import { Color, ColorDistanceMatrix } from '../../Models/color';

interface ColorItemProps {
    color: Color;
    colors: ColorDistanceMatrix;
}

export const ColorItem = (props: ColorItemProps) => {
    const { color, colors } = props;
    const [expanded, setExpanded] = React.useState(false);

    const onRowClick = React.useCallback(() => {
        setExpanded(!expanded);
    }, [expanded]);

    return (
        <div className='row color-row' onClick={onRowClick}>
            <div className='col-sm-1 color-swatch' style={{backgroundColor: '#' + color.rgbCode}}></div>
            <div className='col-sm-2 text'>
                {color.number}
            </div>
            <div className='col-sm-4 text'>{color.description}</div>
            {color.distances.slice(0, 5).map(closeColor =>
                <div className='col-sm-1 color-swatch' key={closeColor.number} title={`${closeColor.number} - ${colors[closeColor.number].description}`} style={{backgroundColor: '#' + colors[closeColor.number].rgbCode}} ></div>
            )}
        </div>
    );
}
