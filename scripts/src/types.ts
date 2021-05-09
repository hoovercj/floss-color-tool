export interface Color {
    number: string;
    description: string;
    rgbCode: string;
    distances: ColorDistance[];
    distances76?: ColorDistance[];
    distances94?: ColorDistance[];
    distances00?: ColorDistance[];
    substitute?: {
        [brand: string]: string;
    }
}

export interface ColorDistance {
    number: string;
    distance: number;
}

export interface ColorDistanceMatrix {
    [colorNumber: string]: Color;
}

export interface ColorsPerBrand {
    [brand: string]: ColorDistanceMatrix;
}
