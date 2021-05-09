"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var convert = require('color-convert');
var DeltaE = require('delta-e');
/**
 * Generates alternative colors from different brands based on color distance.
 * NOTE: This produces different results than the existing charts available
 * on the internet from other hobbyists and yarn stores
 */
function generateBrandAlternatives(colorsPerBrand) {
    var _a, _b;
    const output = {};
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
                    if (!(((_a = output[brand][brandColorId][alternativeBrand]) === null || _a === void 0 ? void 0 : _a.distance) < distance)) {
                        output[brand][brandColorId][alternativeBrand] = {
                            id: alternativeBrandColorId,
                            distance: distance,
                            rgbCode: alternativeBrandColor.rgbCode,
                            description: alternativeBrandColor.description,
                        };
                    }
                    if (!(((_b = output[alternativeBrand][alternativeBrandColorId][brand]) === null || _b === void 0 ? void 0 : _b.distance) < distance)) {
                        output[alternativeBrand][alternativeBrandColorId][brand] = {
                            id: brandColorId,
                            distance: distance,
                            rgbCode: brandColor.rgbCode,
                            description: brandColor.description,
                        };
                    }
                }
            }
        }
    }
    return output;
}
exports.default = generateBrandAlternatives;
