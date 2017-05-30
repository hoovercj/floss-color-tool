import * as fs from 'fs';
import * as path from 'path';

import colorsCsvToJson from './csvToJson';
import colorsToDistanceMatrix from './colorsToDistanceMatrix';
import colorsToCompleteDistanceMatrix from './colorsToCompleteDistanceMatrix';

const colors = colorsCsvToJson();

const resourcesPath = path.resolve(__dirname, '../resources');
const colorsJsonPath = path.join(resourcesPath, 'colors.json');
fs.writeFileSync(colorsJsonPath, JSON.stringify(colors, undefined, 4));

const distanceMatrix = colorsToDistanceMatrix(colors);
const distanceMatrixPath = path.join(resourcesPath, 'colorsDistanceMatrix.json');
fs.writeFileSync(distanceMatrixPath, JSON.stringify(distanceMatrix, undefined, 4));

const completeDistanceMatrix = colorsToDistanceMatrix(colors);
const completeDistanceMatrixPath = path.join(resourcesPath, 'completeColorsDistanceMatrix.json');
fs.writeFileSync(completeDistanceMatrixPath, JSON.stringify(completeDistanceMatrix, undefined, 4));
