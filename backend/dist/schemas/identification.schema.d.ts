import { Document, Schema as MongooseSchema } from 'mongoose';
export type IdentificationDocument = Identification & Document;
export declare class Identification {
    userId?: string;
    imageUrl: string;
    status: string;
    predictions: Array<{
        speciesId?: string;
        scientificName: string;
        commonName?: string;
        confidence: number;
        confidenceBand: string;
    }>;
}
export declare const IdentificationSchema: MongooseSchema<Identification, import("mongoose").Model<Identification, any, any, any, Document<unknown, any, Identification, any, {}> & Identification & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Identification, Document<unknown, {}, import("mongoose").FlatRecord<Identification>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Identification> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
