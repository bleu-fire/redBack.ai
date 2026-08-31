import { Model } from 'mongoose';
import { LearningTopic, LearningTopicDocument } from '../schemas/learning-topic.schema';
export declare class LearningService {
    private learningTopicModel;
    constructor(learningTopicModel: Model<LearningTopicDocument>);
    findAll(): Promise<LearningTopic[]>;
    findBySlug(slug: string): Promise<LearningTopic | null>;
}
