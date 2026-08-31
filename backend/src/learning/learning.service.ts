import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LearningTopic, LearningTopicDocument } from '../schemas/learning-topic.schema';

@Injectable()
export class LearningService {
  constructor(
    @InjectModel(LearningTopic.name)
    private learningTopicModel: Model<LearningTopicDocument>,
  ) {}

  async findAll(): Promise<LearningTopic[]> {
    return this.learningTopicModel.find().exec();
  }

  async findBySlug(slug: string): Promise<LearningTopic | null> {
    return this.learningTopicModel.findOne({ slug }).exec();
  }
}

