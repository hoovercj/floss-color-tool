import * as fs from 'fs';
import * as path from 'path';

import colorsCsvToJson from './csvToJson';
import colorsToDistanceMatrix from './colorsToDistanceMatrix';
import colorsToCompleteDistanceMatrix from './colorsToCompleteDistanceMatrix';

const csvFiles = ["dmc", "anchor", "redheart"];

csvFiles.forEach(filename => {
    const colors = colorsCsvToJson(`${filename}.csv`);

    const resourcesPath = path.resolve(__dirname, '../resources');
    const colorsJsonPath = path.join(resourcesPath, `${filename}.json`);
    fs.writeFileSync(colorsJsonPath, JSON.stringify(colors, undefined, 4));

    const distanceMatrix = colorsToDistanceMatrix(colors);
    const distanceMatrixPath = path.join(resourcesPath, `${filename}ColorsDistanceMatrix.json`);
    fs.writeFileSync(distanceMatrixPath, JSON.stringify(distanceMatrix, undefined, 4));

    const completeDistanceMatrix = colorsToCompleteDistanceMatrix(colors);
    const completeDistanceMatrixPath = path.join(resourcesPath, `${filename}CompleteColorsDistanceMatrix.json`);
    fs.writeFileSync(completeDistanceMatrixPath, JSON.stringify(completeDistanceMatrix, undefined, 4));
});

