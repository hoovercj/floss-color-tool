declare var require: any;
var convert = require('color-convert');
var DeltaE = require('delta-e');

interface Color {
    number: string;
    description: string;
    rgbCode: string;
    distances: ColorDistance[];
}

interface ColorDistance {
    number: string;
    distance: number;
}

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
            const distance = DeltaE.getDeltaE76({L: iColorLabL, A: iColorLabA, B: iColorLabB}, {L: jColorLabL, A: jColorLabA, B: jColorLabB});
            iColor.distances.push({distance: distance, number: jColor.number});
            jColor.distances.push({distance: distance, number: iColor.number});
        }
    }

    const colorsObject = {};

    colorsWithDistance.forEach(color => {
        color.distances = color.distances.sort((a, b) => a.distance - b.distance).slice(0, 5);
        colorsObject[color.number] = color;
    });


    return colorsObject;
}