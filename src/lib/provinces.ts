/*
These enum values also correspond to the values in the database.
* */
export enum Provinces {
    PRI = 1, // Pinar del Río
    ART = 2, // Artemisa
    LHA = 3, // La Habana
    MAY = 4, // Mayabeque
    MTZ = 5, // Matanzas
    CFG = 6, // Cienfuegos
    VLC = 7, // Villa Clara
    SSP = 8, // Sancti Spíritus
    CAV = 9, // Ciego de Ávila
    CAM = 10, // Camagüey
    LTU = 11, // Las Tunas
    HOL = 12, // Holguín
    GRM = 13, // Granma
    SCU = 14, // Santiago de Cuba
    GTM = 15, // Guantánamo
    IJV = 16, // Isla de la Juventud
}

// This is to avoid hardcoding "magic numbers" and it is used
// in the select component to filter the provinces.
export const ALL_PROVINCES_ID = 0;
