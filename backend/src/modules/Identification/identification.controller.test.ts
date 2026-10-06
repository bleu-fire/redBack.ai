import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import { IdentificationController } from './identification.controller';

describe('IdentificationController', () => {
  let controller: IdentificationController;
  let mockVisionService: any;
  let mockModel: any;
  let req: any;
  let res: any;
  let next: jest.Mock;

  const sampleAnalysisResult = {
    topPrediction: {
      scientificName: 'Latrodectus hasselti',
      commonName: 'Redback spider',
      confidence: 0.94,
      confidenceBand: 'high',
      rank: 1,
      vectorSimilarity: 0.92,
      visualEvidence: ['Red dorsal stripe on globular black abdomen'],
    },
    predictions: [],
    uncertaintyLevel: 'low',
    disclaimer: 'Medical safety disclaimer',
    speciesDetails: { commonName: 'Redback spider' },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockVisionService = {
      analyzeSpiderImage: (jest.fn() as any).mockResolvedValue(sampleAnalysisResult),
    };

    mockModel = {
      create: (jest.fn() as any).mockImplementation((data: any) => Promise.resolve({ _id: 'mock-id-123', ...data })),
      find: (jest.fn() as any).mockReturnValue({
        populate: (jest.fn() as any).mockReturnValue({
          sort: (jest.fn() as any).mockResolvedValue([{ _id: 'mock-id-123' }]),
        }),
      }),
      findById: (jest.fn() as any).mockResolvedValue({ _id: 'mock-id-123', imageUrl: 'spider.jpg' }),
    };

    controller = new IdentificationController(mockVisionService, mockModel);

    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  describe('analyzeImage (AI Feature)', () => {
    it('analyzes an uploaded image file successfully', async () => {
      req.file = {
        buffer: Buffer.from('fake-image-bytes'),
        mimetype: 'image/jpeg',
      };
      req.body = { notes: 'Found under garden chair' };

      await controller.analyzeImage(req as Request, res as Response, next as NextFunction);

      expect(mockVisionService.analyzeSpiderImage).toHaveBeenCalledWith({
        imageBuffer: req.file.buffer,
        imageUrl: undefined,
        mimeType: 'image/jpeg',
        userNotes: 'Found under garden chair',
      });

      expect(mockModel.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'success',
          message: 'Spider identified successfully',
          data: expect.objectContaining({
            topPrediction: sampleAnalysisResult.topPrediction,
            uncertaintyLevel: 'low',
          }),
        })
      );
      expect(next).not.toHaveBeenCalled();
    });

    it('analyzes an image URL successfully', async () => {
      req.body = {
        imageUrl: 'https://example.com/redback.jpg',
        notes: 'Backyard specimen',
      };

      await controller.analyzeImage(req as Request, res as Response, next as NextFunction);

      expect(mockVisionService.analyzeSpiderImage).toHaveBeenCalledWith(
        expect.objectContaining({
          imageUrl: 'https://example.com/redback.jpg',
          userNotes: 'Backyard specimen',
        })
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(next).not.toHaveBeenCalled();
    });

    it('returns 400 error when neither file nor imageUrl is provided', async () => {
      req.body = {};

      await controller.analyzeImage(req as Request, res as Response, next as NextFunction);

      expect(mockVisionService.analyzeSpiderImage).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Please provide an image file or imageUrl for analysis',
          statusCode: 400,
        })
      );
    });

    it('passes AI service failures to next', async () => {
      req.file = { buffer: Buffer.from('test'), mimetype: 'image/jpeg' };
      const visionError = new Error('Pinecone connection timed out');
      mockVisionService.analyzeSpiderImage.mockRejectedValue(visionError);

      await controller.analyzeImage(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(visionError);
    });
  });

  describe('CRUD Operations', () => {
    it('creates an identification manually', async () => {
      const data = {
        imageUrl: 'https://example.com/spider.jpg',
        status: 'completed',
        uncertaintyLevel: 'low',
      };
      req.body = data;

      await controller.createIdentification(req as Request, res as Response, next as NextFunction);

      expect(mockModel.create).toHaveBeenCalledWith(data);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(next).not.toHaveBeenCalled();
    });

    it('returns all identifications', async () => {
      await controller.getAllIdentification(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'success',
          results: 1,
        })
      );
    });

    it('returns an identification by ID', async () => {
      req.params = { id: 'mock-id-123' };

      await controller.getIdentificationById(req as Request, res as Response, next as NextFunction);

      expect(mockModel.findById).toHaveBeenCalledWith('mock-id-123');
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('returns 404 if identification is not found', async () => {
      mockModel.findById.mockResolvedValue(null);
      req.params = { id: 'non-existent' };

      await controller.getIdentificationById(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Identification not found',
          statusCode: 404,
        })
      );
    });
  });
});
