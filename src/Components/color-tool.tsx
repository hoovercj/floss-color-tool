import * as React from 'react';
import { Color, ColorDistanceMatrix } from '../Models/color';
import { ColorTable } from './ColorTable/color-table';
import './color-tool.css'

interface ColorTableProps {
    brand: string,
    colors: ColorDistanceMatrix,
}

const DEFAULT_ARRAY: string[] = [];
export const ColorTool = (props: ColorTableProps) => {
    const { brand, colors } = props;

    const [filterText, setFilterText] = React.useState('');
    const [appliedFilter, setAppliedFilter] = React.useState(filterText);

    const filteredColors = React.useMemo(() => {
        const filteredColors = appliedFilter
            ? Object.keys(colors).filter(colorId => {
                const color: Color = colors[colorId];
                return color.description.toLowerCase().includes(appliedFilter) ||
                    color.number.includes(appliedFilter);
            })
            : Object.keys(colors);

        return filteredColors;
    }, [appliedFilter, colors]);

    const timer = React.useRef(0);

    const applyFilter = React.useCallback(() => {
        const trimmedFilter = filterText?.trim().toLowerCase();
        setAppliedFilter(trimmedFilter);
    }, [filterText]);

    React.useEffect(() => {
        if (timer.current) {
            window.clearTimeout(timer.current);
        }

        timer.current = window.setTimeout(applyFilter, 250);
    }, [filterText, applyFilter])

    React.useEffect(() => {
        return () => {
            window.clearTimeout(timer.current);
        }
    }, [])

    const onInputChanged = React.useCallback((event: {target: { value: string}}) => {
        setFilterText(event.target.value);
    }, []);

    return (<>
        <h1 className='text-center'>{brand} Color Substitute Chart</h1>
        <div className='row'>
            <div className='col-xs-12 col-sm-6'>
                <input className='form-control filter' type='text' onChange={onInputChanged} placeholder={`Search for ${brand} # or color name`} value={filterText} />
            </div>
        </div>
        <ColorTable brand={brand} colors={colors} filteredColors={filteredColors || DEFAULT_ARRAY} />
    </>);
}