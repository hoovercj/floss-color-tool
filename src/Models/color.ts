export interface Color {
    number: string;
    description: string;
    rgbCode: string;
    distanceToInputColor: number;
    distances: ColorDistance[];
    substitute?: {
        [brand: string]: string;
    }
}

export interface ColorDistance {
    number: string;
    distance: number;
}

export type ColorDistanceMatrix = { [colorNumber: string]: Color };

export type AllColors = { [brand: string]: ColorDistanceMatrix };