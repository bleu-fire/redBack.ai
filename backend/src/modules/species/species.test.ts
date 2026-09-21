import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import { speciesController } from './species.controller';
import Species from './species.model';

// Mock Species Mongoose model
jest.mock('./species.model');

describe('Species Controller - Jest Tests', () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: {},
      params: {},
      query: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    next = jest.fn();
  });

  // 1. TEST: createSpecies
  describe('createSpecies', () => {
    it('should create a new species and return 201', async () => {
      const mockSpeciesData = {
        scientificName: 'Latrodectus hasselti',
        commonName: 'Redback Spider',
        family: 'Theridiidae',
        genus: 'Latrodectus',
        description: 'Venomous spider',
        habitat: 'Sheltered areas',
        distribution: 'Australia',
        behavior: 'Nocturnal',
        venomInfo: 'Neurotoxic',
        conservationStatus: 'Least Concern',
        imageUrls: ['https://example.com/redback.jpg'],
      };

      req.body = mockSpeciesData;
      (Species.create as any).mockResolvedValue(mockSpeciesData);

      await speciesController.createSpecies(req as Request, res as Response, next);

      expect(Species.create).toHaveBeenCalledWith(mockSpeciesData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Created successfully',
        data: mockSpeciesData,
      });
    });

    it('should call next with error if Species.create throws', async () => {
      const error = new Error('Database connection failed');
      (Species.create as any).mockRejectedValue(error);

      await speciesController.createSpecies(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  // 2. TEST: getAllSpecies
  describe('getAllSpecies', () => {
    it('should return 200 with success message and data', async () => {
      const mockList = [
        { commonName: 'Redback', scientificName: 'Latrodectus hasselti' },
      ];

      (Species.find as any).mockResolvedValue(mockList);

      await speciesController.getAllSpecies(req as Request, res as Response, next);

      expect(Species.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Successfully retrieved data',
        results: mockList.length,
        data: mockList,
      });
    });

    it('should call next with error if Species.find fails', async () => {
      const error = new Error('Find failed');
      (Species.find as any).mockRejectedValue(error);

      await speciesController.getAllSpecies(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  // 3. TEST: getSpeciesById
  describe('getSpeciesById', () => {
    it('should return species by ID with status 200', async () => {
      const mockSpider = {
        _id: 'spider_123',
        commonName: 'Redback Spider',
      };

      req.params = { id: 'spider_123' };
      (Species.findById as any).mockResolvedValue(mockSpider);

      await speciesController.getSpeciesById(req as Request, res as Response, next);

      expect(Species.findById).toHaveBeenCalledWith('spider_123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockSpider,
      });
    });

    it('should call next with error if findById fails', async () => {
      const error = new Error('Database error');
      req.params = { id: 'spider_123' };
      (Species.findById as any).mockRejectedValue(error);

      await speciesController.getSpeciesById(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  // 4. TEST: updateSpecies
  describe('updateSpecies', () => {
    it('should update species and return 200 with updated data', async () => {
      const updatedMock = {
        _id: 'spider_123',
        commonName: 'Updated Redback Spider',
      };

      req.params = { id: 'spider_123' };
      req.body = { commonName: 'Updated Redback Spider' };

      (Species.findByIdAndUpdate as any).mockResolvedValue(updatedMock);

      await speciesController.updateSpecies(req as Request, res as Response, next);

      expect(Species.findByIdAndUpdate).toHaveBeenCalledWith(
        'spider_123',
        { commonName: 'Updated Redback Spider' },
        { new: true, runValidators: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Updated successfully',
        data: updatedMock,
      });
    });

    it('should call next with error if species ID not found', async () => {
      req.params = { id: 'not_found_id' };
      (Species.findByIdAndUpdate as any).mockResolvedValue(null);

      await speciesController.updateSpecies(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
