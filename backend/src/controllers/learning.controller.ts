import { Request, Response, NextFunction } from 'express';
import { LearningTopicModel } from '../models/learning-topic.model';
import { AppError } from '../middlewares/error.middleware';

export async function getAllTopics(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const category = req.query.category as string | undefined;
    const filter: Record<string, any> = {};
    if (category) {
      filter.category = category;
    }

    const topics = await LearningTopicModel.find(filter).sort({ createdAt: -1 });
    res.status(200).json(topics);
  } catch (error) {
    next(error);
  }
}

export async function getTopicBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { slug } = req.params;
    const topic = await LearningTopicModel.findOne({ slug: slug.toLowerCase() });
    if (!topic) {
      throw new AppError(`Topic with slug "${slug}" not found`, 404, 'NOT_FOUND');
    }
    res.status(200).json(topic);
  } catch (error) {
    next(error);
  }
}

export async function createTopic(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { slug, title, content, category, sourceUrl } = req.body;
    if (!slug || !title || !content) {
      throw new AppError('Slug, title, and content are required', 400, 'VALIDATION_ERROR');
    }

    const existing = await LearningTopicModel.findOne({ slug: slug.toLowerCase() });
    if (existing) {
      throw new AppError(`Topic with slug "${slug}" already exists`, 409, 'CONFLICT');
    }

    const topic = await LearningTopicModel.create({
      slug: slug.toLowerCase(),
      title,
      content,
      category,
      sourceUrl,
    });

    res.status(201).json(topic);
  } catch (error) {
    next(error);
  }
}
