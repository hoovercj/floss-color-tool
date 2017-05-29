export interface Color {
    number: string;
    description: string;
    rgbCode: string;
    distances: ColorDistance[];
}

export interface ColorDistance {
    number: string;
    distance: number;
}

export type ColorDistanceMatrix = {[key: string]: Color};