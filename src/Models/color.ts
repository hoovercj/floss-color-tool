export interface Color {
    Floss: string;
    Description: string;
    Red: string;
    Green: string;
    Blue: string;
    RGBcode: string;
    Row: string;
    Distances: ColorDistance[];
}

export interface ColorDistance {
    Floss: string;
    Distance: number;
}

export type ColorDistanceMatrix = {[key: string]: Color};