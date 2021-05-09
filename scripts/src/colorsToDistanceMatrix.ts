import { Color } from './types';

declare var require: any;
var convert = require('color-convert');
var DeltaE = require('delta-e');

export default function colorsToDistanceMatrix(colors: Color[]): {[key: string]: Color} {
    const colorsWithDistance: Color[] = [];
    for (let i = 0; i < colors.length; i++) {
        const iColor = Object.assign({}, colors[i]);
        iColor.distances = [];
        colorsWithDistance.push(iColor);
        for (let j = 0; j < i; j++) {
            const jColor = colorsWithDistance[j];
            const [iColorLabL, iColorLabA, iColorLabB] = convert.hex.lab(iColor.rgbCode);
            const [jColorLabL, jColorLabA, jColorLabB] = convert.hex.lab(jColor.rgbCode);
            // TODO: Why did I originally chose E76 over E00?
            // const distance = DeltaE.getDeltaE76({ L: iColorLabL, A: iColorLabA, B: iColorLabB }, { L: jColorLabL, A: jColorLabA, B: jColorLabB });
            const distance = DeltaE.getDeltaE00({ L: iColorLabL, A: iColorLabA, B: iColorLabB }, { L: jColorLabL, A: jColorLabA, B: jColorLabB });
            // TODO: Don't include the distance, just give an ordered list of numbers
            iColor.distances.push({distance: distance, number: jColor.number});
            jColor.distances.push({distance: distance, number: iColor.number});
        }
    }

    const colorsObject: Record<string, any> = {};

    colorsWithDistance.forEach(color => {
        color.distances = color.distances.sort((a, b) => a.distance - b.distance).slice(0, 5);
        colorsObject[color.number] = color;
    });


    return colorsObject;
}