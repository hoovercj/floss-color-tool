import * as React from 'react';
import { Color, ColorDistanceMatrix } from '../../Models/color';
import { CloseColorRow } from './close-color-row';

import { HashLink } from 'react-router-hash-link';

interface ColorRowProps {
    brand: string;
    color: Color;
    colors: ColorDistanceMatrix;
}

const DEFAULT_EXPANDED_CLASS = '';
const ACTIVE_CLASS = 'active';


export const ColorRow = (props: ColorRowProps) =>{
    const { brand, color, colors } = props;
    const [expanded, setExpanded] = React.useState(false);

    const onRowClick = React.useCallback(() => {
        setExpanded(!expanded);
    }, [expanded]);


    const className = expanded ? ACTIVE_CLASS : DEFAULT_EXPANDED_CLASS;
    return (
        <tbody className={`${className}`}>
            <tr className='clickable' onClick={onRowClick}>
                <td className='text-center' id={color.number}>{color.number}</td>
                <td style={{backgroundColor: '#' + color.rgbCode}}/>
                <td>{color.description}</td>
                <td>{color.substitute ? Object.keys(color.substitute).map(brand => (
                    <HashLink key={brand + color.substitute![brand]} smooth to={`/${brand.toLowerCase()}#${color.substitute![brand]}`}>
                        {brand} {color.substitute![brand]}
                    </HashLink>
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
                <div className='row inner bold'>
                    <div className='col-2 text-center'>{brand} #</div>
                    <div className='col-4'>Name</div>
                    <div className='col-3 text-center'>Alternative</div>
                    <div className='col-3 text-center'>Original</div>
                </div>
                    {color.distances.slice(0, 5).map(closeColor =>
                        <CloseColorRow
                            key={closeColor.number}
                            brand={brand}
                            visible={expanded}
                            color={color}
                            closeColor={colors[closeColor.number]}
                        />
                    )}
                </td>
            </tr>
        </tbody>
    );
}
