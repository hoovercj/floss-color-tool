import * as fs from 'fs';
import * as path from 'path';

import generateColors from './generateColors';
import { Color, ColorsPerBrand } from './types';
import colorsToDistanceMatrix from './colorsToDistanceMatrix';
import colorsToCompleteDistanceMatrix from './colorsToCompleteDistanceMatrix';
import generateBrandAlternatives from './generateBrandAlternatives';
import alternatives from './dmcToAnchor';

const run = () => {
    const brands = ['DMC', 'Anchor'];
    const resourcesDir = path.resolve(__dirname, '../resources');
    const outputDir = path.join(resourcesDir, 'out');

    fs.rmdirSync(outputDir, { recursive: true });
    fs.mkdirSync(outputDir);

    const distanceMatrices = {} as ColorsPerBrand;

    brands.forEach(brand => {
        const csvPath = path.join(resourcesDir, `${brand}.csv`)
        console.log(`Converting ${csvPath} to json...`);
        const colors = generateColors(csvPath);

        if (alternatives[brand]) {
            colors.forEach(color => {
                const alternative = alternatives[brand][color.number];
                if (alternative) {
                    if (!color.substitute) {
                        color.substitute = {};
                    }

                    Object.keys(alternative).forEach(alternativeBrand => {
                        color.substitute![alternativeBrand] = alternative[alternativeBrand];
                    })
                }
            });
        }

        const distanceMatrix = colorsToDistanceMatrix(colors);
        distanceMatrices[brand] = distanceMatrix;
    });

    const outputFile = path.join(outputDir, 'colors.json');
    console.log(`Saving output ${outputFile}`);
    fs.writeFileSync(outputFile, JSON.stringify(distanceMatrices, undefined, 4));
}


const emitDiagnosticFiles = (brand: string, colors: Color[], outputDir: string) => {
    const colorsJsonPath = path.join(outputDir, `${brand}.json`);
    console.log(`Saving json ${colorsJsonPath}`);
    fs.writeFileSync(colorsJsonPath, JSON.stringify(colors, undefined, 4));

    const completeDistanceMatrix = colorsToCompleteDistanceMatrix(colors);
    const completeDistanceMatrixPath = path.join(outputDir, `${brand}CompleteColorsDistanceMatrix.json`);
    fs.writeFileSync(completeDistanceMatrixPath, JSON.stringify(completeDistanceMatrix, undefined, 4));
}

const emitAlternativeFiles = (distanceMatrices: ColorsPerBrand, outputDir: string) => {
    const brandAlternativesPath = path.join(outputDir, `brandAlternatives.json`);
    const brandAlternatives = generateBrandAlternatives(distanceMatrices);
    fs.writeFileSync(brandAlternativesPath, JSON.stringify(brandAlternatives, undefined, 4));
}

run();