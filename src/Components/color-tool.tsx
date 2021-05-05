import * as React from 'react';
import { Color, ColorDistanceMatrix } from '../Models/color';
import { ColorTable } from './ColorTable/color-table';
import './color-tool.css'

interface ColorTableProps {
    colors: ColorDistanceMatrix;
}

const DEFAULT_ARRAY: string[] = [];
export const ColorTool = (props: ColorTableProps) => {
    const { colors } = props;
    const [filter, setFilter] = React.useState('');
    const [filteredColors, setFilteredColors] = React.useState(Object.keys(colors));
    const timer = React.useRef(0);

    const applyFilter = React.useCallback(() => {
        const trimmedFilter = filter?.trim().toLowerCase();

        const filteredColors = trimmedFilter
            ? Object.keys(colors).filter(colorId => {
                const color: Color = colors[colorId];
                return color.description.toLowerCase().includes(trimmedFilter) ||
                    color.number.includes(trimmedFilter);
            })
            : Object.keys(colors);

        setFilteredColors(filteredColors);
    }, [colors, filter]);

    React.useEffect(() => {
        if (timer.current) {
            window.clearTimeout(timer.current);
        }

        timer.current = window.setTimeout(applyFilter, 250);
    }, [filter, applyFilter])

    React.useEffect(() => {
        return () => {
            window.clearTimeout(timer.current);
        }
    }, [])


    const onInputChanged = React.useCallback((event: {target: { value: string}}) => {
        setFilter(event.target.value);
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-lg-8 col-lg-offset-2">
                    <h1 className="text-center">DMC Color Substitute Chart</h1>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6">
                            <input className="form-control filter" type="text" onChange={onInputChanged} placeholder="Search for DMC # or name" value={filter} />
                        </div>
                    </div>
                    <ColorTable colors={colors} filteredColors={filteredColors || DEFAULT_ARRAY} />
                </div>
            </div>
        </div>
    );
}