import { ColorDistanceMatrix } from './types';

declare var require: any;
var convert = require('color-convert');
var DeltaE = require('delta-e');

export interface BrandColorsWithAlternatives {
    [brand: string]: {
        [brandColorId: string]: {
            [alternativeBrand: string]: {
                id: string;
                rgbCode: string;
                description: string;
                distance: number;
            }
        }
    }
}

/**
 * Generates alternative colors from different brands based on color distance.
 * NOTE: This produces different results than the existing charts available
 * on the internet from other hobbyists and yarn stores
 */
export default function generateBrandAlternatives(colorsPerBrand: {[brand: string]: ColorDistanceMatrix}): BrandColorsWithAlternatives {
    const output: BrandColorsWithAlternatives = {};
    const brands = Object.keys(colorsPerBrand);

    brands.forEach(brand => {
        output[brand] = {};
    });

    for (let brandIndex = 0; brandIndex < brands.length; brandIndex++) {
        let brand = brands[brandIndex];

        let brandColors = colorsPerBrand[brand];
        const brandColorIds = Object.keys(brandColors);
        for (let alternativeBrandIndex = brandIndex + 1; alternativeBrandIndex < brands.length; alternativeBrandIndex++) {
            let alternativeBrand = brands[alternativeBrandIndex];
            let alternativeBrandColors = colorsPerBrand[alternativeBrand];
            const alternativeBrandColorIds = Object.keys(alternativeBrandColors);

            for (let brandColorId of brandColorIds) {
                if (!output[brand][brandColorId]) {
                    output[brand][brandColorId] = {};
                }

                const brandColor = brandColors[brandColorId];
                const [brandColorLabL, brandColorLabA, brandColorLabB] = convert.hex.lab(brandColor.rgbCode);
                const brandLabColor = {
                    L: brandColorLabL,
                    A: brandColorLabA,
                    B: brandColorLabB,
                };

                for (let alternativeBrandColorId of alternativeBrandColorIds) {
                    if (!output[alternativeBrand][alternativeBrandColorId]) {
                        output[alternativeBrand][alternativeBrandColorId] = {};
                    }

                    const alternativeBrandColor = alternativeBrandColors[alternativeBrandColorId];
                    const [alternativeBrandColorLabL, alternativeBrandColorLabA, alternativeBrandColorLabB] = convert.hex.lab(alternativeBrandColor.rgbCode);
                    const distance = DeltaE.getDeltaE00(brandLabColor, { L: alternativeBrandColorLabL, A: alternativeBrandColorLabA, B: alternativeBrandColorLabB });

                    if (!(output[brand][brandColorId][alternativeBrand]?.distance < distance)) {
                        output[brand][brandColorId][alternativeBrand] = {
                            id: alternativeBrandColorId,
                            distance: distance,
                            rgbCode: alternativeBrandColor.rgbCode,
                            description: alternativeBrandColor.description,
                        }
                    }

                    if (!(output[alternativeBrand][alternativeBrandColorId][brand]?.distance < distance)) {
                        output[alternativeBrand][alternativeBrandColorId][brand] = {
                            id: brandColorId,
                            distance: distance,
                            rgbCode: brandColor.rgbCode,
                            description: brandColor.description,
                        }
                    }
                }
            }
        }
    }

    return output;
}