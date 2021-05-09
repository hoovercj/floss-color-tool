import * as React from 'react';
import { Color, ColorDistanceMatrix } from '../../Models/color';
import { CloseColorRow } from './close-color-row';

interface ColorRowProps {
    brand: string;
    color: Color;
    colors: ColorDistanceMatrix;
}

const DEFAULT_EXPANDED_CLASS = '';
const ACTIVE_CLASS = 'active';

const idForColor = (brand: string, color: Color): string => (brand + color.number).toLowerCase();

export const ColorRow = (props: ColorRowProps) =>{
    const { brand, color, colors } = props;
    const [expanded, setExpanded] = React.useState(false);

    const onRowClick = React.useCallback(() => {
        setExpanded(!expanded);
    }, [expanded]);


    const className = expanded ? ACTIVE_CLASS : DEFAULT_EXPANDED_CLASS;
    return (
        <tbody className={`${className}`}>
            <tr className="clickable" onClick={onRowClick}>
                <td className="link-target text-center" id={idForColor(brand, color)}>{color.number}</td>
                <td style={{backgroundColor: '#' + color.rgbCode}}/>
                <td>{color.description}</td>
                <td>{color.substitute ? Object.keys(color.substitute).map(brand => (
                    // TODO: Make this a link
                    <span key={brand + color.substitute![brand]}>
                        {brand} {color.substitute![brand]}
                    </span>
                )) : undefined}
                </td>
                {color.distances.slice(0, 5).map(closeColor =>
                    <td
                        key={closeColor.number}
                        title={`${closeColor.number} - ${colors[closeColor.number].description}`}
                        style={{backgroundColor: '#' + colors[closeColor.number].rgbCode}}
                    />
                )}
            </tr>
            <tr className={expanded ? '' : 'hidden'}>
                <td colSpan={9}>
                <div className="row inner bold">
                    <div className="col-xs-2 text-center">{brand} #</div>
                    <div className="col-xs-4">Name</div>
                    <div className="col-xs-3 text-center">Alternative</div>
                    <div className="col-xs-3 text-center">Original</div>
                </div>
                    {color.distances.slice(0, 5).map(closeColor =>
                        <CloseColorRow
                            key={closeColor.number}
                            visible={expanded}
                            color={color}
                            closeColor={colors[closeColor.number]}
                            brand={brand}
                            idForColor={idForColor}
                        />
                    )}
                </td>
            </tr>
        </tbody>
    );
}
