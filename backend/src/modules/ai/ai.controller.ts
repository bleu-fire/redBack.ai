import { Request, Response, NextFunction } from 'express';
import { aiService, AIService } from './ai.service';
import { AppError } from '../../middlewares/error.middleware';

export class AIController {
  constructor(private service: AIService = aiService) {}

  chatWithAI = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { message, context } = req.body;

      if (!message || typeof message !== 'string') {
        throw new AppError('Message is required and must be a string', 400);
      }

      const reply = await this.service.askNaturalist(message, context);

      return res.status(200).json({
        status: 'success',
        reply,
      });
    } catch (error) {
      next(error);
    }
  };
}

export const aiController = new AIController();
