import * as fs from 'fs';
import { Color } from './types';

type ColorFormat = 'hex' | 'decimal';

export default function generateColors(csvPath: string, format: ColorFormat = 'decimal'): Color[] {
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
                    // Decimal strings are base-10 encorded BGR order hex values
                    // so they must be converted to hex, split, and then reversed
                    let hexString = parseInt(value, 10).toString(16);
                    while (hexString.length < 6) {
                        hexString = "0" + hexString;
                    }
                    value = hexString.match(/.{1,2}/g)!.reverse().join("");
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
