import * as React from 'react';
import { Color, ColorDistanceMatrix } from '../Models/color';
import { ColorTable } from './ColorTable/color-table';
import './color-tool.css'
import { hexToRgb, rgb2lab, } from './colorConverter.js';

const DeltaE = require("delta-e");
interface ColorTableProps {
    brand: string,
    colors: ColorDistanceMatrix,
    filterText: string;
    filterColor: string;
}

const DEFAULT_ARRAY: string[] = [];
export const ColorTool = (props: ColorTableProps) => {
    const { brand, colors, filterText, filterColor } = props;

    const [appliedFilter, setAppliedFilter] = React.useState(filterText);

    const filteredColors = React.useMemo(() => {
        const filteredColors = appliedFilter
            ? Object.keys(colors).filter(colorId => {
                const color: Color = colors[colorId];
                return color.description.toLowerCase().includes(appliedFilter) ||
                    color.number.includes(appliedFilter);
            })
            : Object.keys(colors);


        // New Part:
        // The filtered Colors are additionally sorted by Similarity to the filterColor
        if (filterColor.length === 7) {
            let input_as_lab = rgb2lab(hexToRgb(filterColor) || [0, 0, 0]);

            // delta-e needs the LAB color to be an object, not an array. Oh well.
            let valid_lab_input = { L: input_as_lab[0], A: input_as_lab[1], B: input_as_lab[2] };

            // Calculate LAB distance for every color to the input color
            filteredColors.forEach(
                (color) => {
                    let color_obj = colors[color]

                    let color_in_lab = rgb2lab(hexToRgb(color_obj.rgbCode) || [0, 0, 0]);
                    let labCode = {
                        L: color_in_lab[0],
                        A: color_in_lab[1],
                        B: color_in_lab[2],
                    };

                    color_obj.distanceToInputColor = DeltaE.getDeltaE00(valid_lab_input, labCode);
                }
            )

            // Sort by that LAB distance
            filteredColors.sort(
                (a, b) => (
                    colors[a].distanceToInputColor - colors[b].distanceToInputColor
                )
            );

        }

        return filteredColors;

    }, [appliedFilter, colors, filterColor]);

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

    return (<>
        <ColorTable brand={brand} colors={colors} filteredColors={filteredColors || DEFAULT_ARRAY} />
    </>);
}