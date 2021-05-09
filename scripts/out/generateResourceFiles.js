"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const generateColors_1 = require("./generateColors");
const colorsToDistanceMatrix_1 = require("./colorsToDistanceMatrix");
const colorsToCompleteDistanceMatrix_1 = require("./colorsToCompleteDistanceMatrix");
const generateBrandAlternatives_1 = require("./generateBrandAlternatives");
const dmcToAnchor_1 = require("./dmcToAnchor");
const run = () => {
    const brands = ['DMC', 'Anchor'];
    const resourcesDir = path.resolve(__dirname, '../resources');
    const outputDir = path.join(resourcesDir, 'out');
    fs.rmdirSync(outputDir, { recursive: true });
    fs.mkdirSync(outputDir);
    const distanceMatrices = {};
    brands.forEach(brand => {
        const csvPath = path.join(resourcesDir, `${brand}.csv`);
        console.log(`Converting ${csvPath} to json...`);
        const colors = generateColors_1.default(csvPath);
        if (dmcToAnchor_1.default[brand]) {
            colors.forEach(color => {
                const alternative = dmcToAnchor_1.default[brand][color.number];
                if (alternative) {
                    if (!color.substitute) {
                        color.substitute = {};
                    }
                    Object.keys(alternative).forEach(alternativeBrand => {
                        color.substitute[alternativeBrand] = alternative[alternativeBrand];
                    });
                }
            });
        }
        const distanceMatrix = colorsToDistanceMatrix_1.default(colors);
        distanceMatrices[brand] = distanceMatrix;
    });
    const outputFile = path.join(outputDir, 'colors.json');
    console.log(`Saving output ${outputFile}`);
    fs.writeFileSync(outputFile, JSON.stringify(distanceMatrices, undefined, 4));
};
const emitDiagnosticFiles = (brand, colors, outputDir) => {
    const colorsJsonPath = path.join(outputDir, `${brand}.json`);
    console.log(`Saving json ${colorsJsonPath}`);
    fs.writeFileSync(colorsJsonPath, JSON.stringify(colors, undefined, 4));
    const completeDistanceMatrix = colorsToCompleteDistanceMatrix_1.default(colors);
    const completeDistanceMatrixPath = path.join(outputDir, `${brand}CompleteColorsDistanceMatrix.json`);
    fs.writeFileSync(completeDistanceMatrixPath, JSON.stringify(completeDistanceMatrix, undefined, 4));
};
const emitAlternativeFiles = (distanceMatrices, outputDir) => {
    const brandAlternativesPath = path.join(outputDir, `brandAlternatives.json`);
    const brandAlternatives = generateBrandAlternatives_1.default(distanceMatrices);
    fs.writeFileSync(brandAlternativesPath, JSON.stringify(brandAlternatives, undefined, 4));
};
run();
