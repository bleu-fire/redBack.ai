import { Request, Response, NextFunction } from 'express';
import { IdentificationModel } from './identification.model';
import { AppError } from '../../middlewares/error.middleware';
import { visionAIService, VisionAIService } from '../../services/ai/vision.service';

/**
 * IdentificationController
 * Handles spider scanning, AI vision analysis, and saving identification records.
 */
export class IdentificationController {
  constructor(
    // Allows injecting mock services during testing
    private visionService: Pick<VisionAIService, 'analyzeSpiderImage'> = visionAIService,
    private model: any = IdentificationModel
  ) {}

  /**
   * POST /api/identification/analyze
   * Main AI feature: Receives an uploaded photo, identifies the spider, and saves the result.
   */
  analyzeImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file;
      const { imageUrl, notes } = req.body;

      // 1. Validation: Make sure the user provided an image file or URL
      if (!file && !imageUrl) {
        throw new AppError('Please provide an image file or imageUrl for analysis', 400);
      }

      // 2. AI Vision: Analyze the spider image using our AI service
      const analysis = await this.visionService.analyzeSpiderImage({
        imageBuffer: file?.buffer,
        imageUrl: imageUrl,
        mimeType: file?.mimetype,
        userNotes: notes,
      });

      // 3. Database: Save the identification record to MongoDB
      const userId = (req as any).user?._id || (req as any).user?.id || undefined;
      const savedRecord = await this.model.create({
        userId,
        imageUrl: imageUrl || (file ? `upload-${Date.now()}.${file.mimetype.split('/')[1] || 'jpg'}` : 'specimen.jpg'),
        status: 'completed',
        uncertaintyLevel: analysis.uncertaintyLevel,
        predictions: analysis.predictions,
        topPrediction: analysis.topPrediction,
        disclaimer: analysis.disclaimer,
        notes: notes || analysis.notes,
      });

      // 4. Response: Return the identification and species safety details
      return res.status(201).json({
        status: 'success',
        message: 'Spider identified successfully',
        data: {
          identification: savedRecord,
          topPrediction: analysis.topPrediction,
          predictions: analysis.predictions,
          uncertaintyLevel: analysis.uncertaintyLevel,
          disclaimer: analysis.disclaimer,
          speciesDetails: analysis.speciesDetails,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /api/identification
   * Create an identification record manually.
   */
  createIdentification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const record = await this.model.create(req.body);
      if (!record) {
        throw new AppError('Failed to create identification record', 400);
      }
      res.status(201).json({ status: 'success', data: record });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/identification
   * Get all past identifications for history.
   */
  getAllIdentification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const records = await this.model
        .find()
        .populate('userId', 'name email')
        .sort('-createdAt');

      res.status(200).json({
        status: 'success',
        results: records.length,
        data: records,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/identification/:id
   * Get a single identification record by its ID.
   */
  getIdentificationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const record = await this.model.findById(id);

      if (!record) {
        throw new AppError('Identification not found', 404);
      }

      res.status(200).json({ status: 'success', data: record });
    } catch (error) {
      next(error);
    }
  };
}

export const identificationController = new IdentificationController();
export default identificationController;
