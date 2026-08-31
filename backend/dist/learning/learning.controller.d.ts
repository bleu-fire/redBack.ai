import { LearningService } from './learning.service';
export declare class LearningController {
    private readonly learningService;
    constructor(learningService: LearningService);
    getAllTopics(): Promise<import("../schemas/learning-topic.schema").LearningTopic[]>;
    getTopicBySlug(slug: string): Promise<import("../schemas/learning-topic.schema").LearningTopic>;
}
