import * as fs from 'fs';
import * as path from 'path';

export default function colorsCsvToJson() {
    const resourcesPath = path.resolve(__dirname, '../resources');
    const csvPath = path.join(resourcesPath, 'colors.csv');
    const csvFile = fs.readFileSync(csvPath);

    const csvLines = csvFile.toString().split('\n');
    const csvHeaders = csvLines.shift().split(',');

    const csvLineToJson = (headerValues: string[], line: string) => {
            const dataValues = line.split(',');
            const json: any = {};
            headerValues.forEach((headerValue, index) => {
                    json[headerValue.trim().replace(' ', '')] = dataValues[index].trim();
            });

            return json;
    }

    const json = csvLines.map(line => csvLineToJson(csvHeaders, line));
    return json;
}