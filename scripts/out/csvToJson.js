"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
function colorsCsvToJson() {
    const resourcesPath = path.resolve(__dirname, '../resources');
    const csvPath = path.join(resourcesPath, 'colors.csv');
    const csvFile = fs.readFileSync(csvPath);
    const csvLines = csvFile.toString().split('\n');
    const csvHeaders = csvLines.shift().split(',');
    const csvLineToJson = (headerValues, line) => {
        const dataValues = line.split(',');
        const json = {};
        headerValues.forEach((headerValue, index) => {
            json[headerValue.trim().replace(' ', '')] = dataValues[index].trim();
        });
        return json;
    };
    const json = csvLines.map(line => csvLineToJson(csvHeaders, line));
    return json;
}
exports.default = colorsCsvToJson;
