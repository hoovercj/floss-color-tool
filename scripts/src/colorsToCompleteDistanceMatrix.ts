declare var require: any;
var convert = require('color-convert');
var DeltaE = require('delta-e');

interface Color {
    number: string;
    description: string;
    rgbCode: string;
    distances76: ColorDistance[];
    distances94: ColorDistance[];
    distances00: ColorDistance[];
}

interface ColorDistance {
    number: string;
    distance: number;
}

export default function colorsToCompleteDistanceMatrix(colors: Color[]): {[key: string]: Color} {
    const colorsWithDistance: Color[] = [];
    for (let i = 0; i < colors.length; i++) {
        const iColor = Object.assign({}, colors[i]);
        iColor.distances = [];
        colorsWithDistance.push(iColor);
        for (let j = 0; j < i; j++) {
            const jColor = colorsWithDistance[j];
            const [iColorLabL, iColorLabA, iColorLabB] = convert.hex.lab(iColor.rgbCode);
            const [jColorLabL, jColorLabA, jColorLabB] = convert.hex.lab(jColor.rgbCode);
            const distance76 = DeltaE.getDeltaE76({L: iColorLabL, A: iColorLabA, B: iColorLabB}, {L: jColorLabL, A: jColorLabA, B: jColorLabB});
            const distance94 = DeltaE.getDeltaE94({L: iColorLabL, A: iColorLabA, B: iColorLabB}, {L: jColorLabL, A: jColorLabA, B: jColorLabB});
            const distance00 = DeltaE.getDeltaE00({L: iColorLabL, A: iColorLabA, B: iColorLabB}, {L: jColorLabL, A: jColorLabA, B: jColorLabB});
            iColor.distances76.push({distance: distance76, number: jColor.number});
            iColor.distances94.push({distance: distance94, number: jColor.number});
            iColor.distances00.push({distance: distance00, number: jColor.number});
            jColor.distances76.push({distance: distance76, number: iColor.number});
            jColor.distances94.push({distance: distance94, number: iColor.number});
            jColor.distances00.push({distance: distance00, number: iColor.number});
        }
    }

    const colorsObject = {};

    colorsWithDistance.forEach(color => {
        color.distances76 = color.distances76.sort((a, b) => a.distance - b.distance).slice(0, 5);
        color.distances94 = color.distances94.sort((a, b) => a.distance - b.distance).slice(0, 5);
        color.distances00 = color.distances00.sort((a, b) => a.distance - b.distance).slice(0, 5);
        colorsObject[color.number] = color;
    });


    return colorsObject;
}