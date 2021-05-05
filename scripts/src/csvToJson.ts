import * as fs from 'fs';
import * as path from 'path';

type ColorFormat = 'hex' | 'decimal';

export default function colorsCsvToJson(filename: string, format: ColorFormat = 'decimal') {
    const resourcesPath = path.resolve(__dirname, '../resources');
    const csvPath = path.join(resourcesPath, filename);
    const csvFile = fs.readFileSync(csvPath);

    const csvLines = csvFile.toString().split('\n');
    const csvHeaders = csvLines.shift()!.split(',');

    if (csvHeaders.length !== 3) {
        throw Error("There should be 3 headers");
    }

    const csvLineToJson = (headerValues: string[], line: string) => {
        const dataValues = line.split(',');

        if (dataValues.length !== 3) {
            throw Error("There should be 3 values per line");
        }

        const json: any = {};
        headerValues.forEach((headerValue, index) => {
            let value = dataValues[index].trim();

            if (index === 2) {
                if (format === 'decimal') {
                    value = parseInt(value, 10).toString(16);
                }

                value = value.toUpperCase();
            }

            json[headerValue.trim().replace(' ', '')] = value;
        });

        return json;
    }

    const json = csvLines.map(line => csvLineToJson(csvHeaders, line));
    return json;
}
