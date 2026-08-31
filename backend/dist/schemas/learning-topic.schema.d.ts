import { Document } from 'mongoose';
export type LearningTopicDocument = LearningTopic & Document;
export declare class LearningTopic {
    slug: string;
    title: string;
    content: string;
    category?: string;
    sourceUrl?: string;
}
export declare const LearningTopicSchema: import("mongoose").Schema<LearningTopic, import("mongoose").Model<LearningTopic, any, any, any, Document<unknown, any, LearningTopic, any, {}> & LearningTopic & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LearningTopic, Document<unknown, {}, import("mongoose").FlatRecord<LearningTopic>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<LearningTopic> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
