import { Request, Response, NextFunction } from 'express';
import { aiService, AIService } from './ai.service';
import { AppError } from '../../middlewares/error.middleware';
import { AuthRequest } from '../../middlewares/auth.middleware';

export class AIController {
  constructor(private service: AIService = aiService) {}

  chatWithAI = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { message, context, history } = req.body;

      if (!message || typeof message !== 'string') {
        throw new AppError('Message is required and must be a string', 400);
      }

      const { reply, sources } = await this.service.askNaturalist(message, context, history);

      return res.status(200).json({
        status: 'success',
        reply,
        sources: sources || [],
      });
    } catch (error) {
      next(error);
    }
  };

  createConversation = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      if (!userId) {
        throw new AppError('Unauthorized', 401);
      }

      const { title, speciesContext, message } = req.body;
      const conversation = await this.service.createConversation(
        userId.toString(),
        title,
        speciesContext,
        message
      );

      return res.status(201).json({
        status: 'success',
        data: conversation,
      });
    } catch (error) {
      next(error);
    }
  };

  getUserConversations = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      if (!userId) {
        throw new AppError('Unauthorized', 401);
      }

      const conversations = await this.service.getUserConversations(userId.toString());

      return res.status(200).json({
        status: 'success',
        results: conversations.length,
        data: conversations,
      });
    } catch (error) {
      next(error);
    }
  };

  getConversation = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      if (!userId) {
        throw new AppError('Unauthorized', 401);
      }

      const { id } = req.params;
      const conversation = await this.service.getConversationById(id, userId.toString());

      return res.status(200).json({
        status: 'success',
        data: conversation,
      });
    } catch (error) {
      next(error);
    }
  };

  sendMessage = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      if (!userId) {
        throw new AppError('Unauthorized', 401);
      }

      const { id } = req.params;
      const { message } = req.body;

      if (!message || typeof message !== 'string') {
        throw new AppError('Message is required and must be a string', 400);
      }

      const result = await this.service.addMessageToConversation(id, userId.toString(), message);

      return res.status(200).json({
        status: 'success',
        reply: result.reply,
        sources: result.sources,
        data: result.conversation,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteConversation = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      if (!userId) {
        throw new AppError('Unauthorized', 401);
      }

      const { id } = req.params;
      await this.service.deleteConversation(id, userId.toString());

      return res.status(200).json({
        status: 'success',
        message: 'Conversation deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

export const aiController = new AIController();
