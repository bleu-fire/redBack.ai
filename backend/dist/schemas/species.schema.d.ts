import { Document } from 'mongoose';
export type SpeciesDocument = Species & Document;
export declare class Species {
    scientificName: string;
    commonName?: string;
    family?: string;
    genus?: string;
    description?: string;
    habitat?: string;
    distribution?: string;
    behavior?: string;
    venomInfo?: string;
    conservationStatus?: string;
    imageUrls?: string[];
}
export declare const SpeciesSchema: import("mongoose").Schema<Species, import("mongoose").Model<Species, any, any, any, Document<unknown, any, Species, any, {}> & Species & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Species, Document<unknown, {}, import("mongoose").FlatRecord<Species>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Species> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
