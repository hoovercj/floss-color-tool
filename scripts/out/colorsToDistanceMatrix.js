"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var convert = require('color-convert');
var DeltaE = require('delta-e');
function colorsToDistanceMatrix(colors) {
    const colorsWithDistance = [];
    for (let i = 0; i < colors.length; i++) {
        const iColor = Object.assign({}, colors[i]);
        iColor.Distances = [];
        colorsWithDistance.push(iColor);
        for (let j = 0; j < i; j++) {
            const jColor = colorsWithDistance[j];
            const [iColorLabL, iColorLabA, iColorLabB] = convert.hex.lab(iColor.RGBcode);
            const [jColorLabL, jColorLabA, jColorLabB] = convert.hex.lab(jColor.RGBcode);
            const distance = DeltaE.getDeltaE76({ L: iColorLabL, A: iColorLabA, B: iColorLabB }, { L: jColorLabL, A: jColorLabA, B: jColorLabB });
            iColor.Distances.push({ Distance: distance, Floss: jColor.Floss });
            jColor.Distances.push({ Distance: distance, Floss: iColor.Floss });
        }
    }
    const colorsObject = {};
    colorsWithDistance.forEach(color => {
        color.Distances = color.Distances.sort((a, b) => a.Distance - b.Distance);
        colorsObject[color.Floss] = color;
    });
    return colorsObject;
}
exports.default = colorsToDistanceMatrix;
