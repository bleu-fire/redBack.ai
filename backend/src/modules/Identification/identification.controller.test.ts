import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import { IdentificationController } from './identification.controller';
import { IdentificationModel } from './identification.model';

jest.mock('./identification.model');

describe('IdentificationController', () => {
  let controller: IdentificationController;
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new IdentificationController();
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it('creates an identification', async () => {
    const data = {
      userId: 'user-1',
      imageUrl: 'https://example.com/spider.jpg',
      status: 'completed',
      uncertaintyLevel: 'low',
    };
    req.body = data;
    (IdentificationModel.create as any).mockResolvedValue(data);

    await controller.createIdentification(req as Request, res as Response, next as NextFunction);

    expect(IdentificationModel.create).toHaveBeenCalledWith(data);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ status: 'success', data });
    expect(next).not.toHaveBeenCalled();
  });

  it('returns all identifications', async () => {
    const data = [{ _id: 'identification-1' }];
    (IdentificationModel.find as any).mockResolvedValue(data);

    await controller.getAllIdentification(req as Request, res as Response, next as NextFunction);

    expect(IdentificationModel.find).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ status: 'success', data });
  });

  it('returns an identification by ID', async () => {
    const data = { _id: 'identification-1' };
    req.params = { id: 'identification-1' };
    (IdentificationModel.findById as any).mockResolvedValue(data);

    await controller.getIdentificationById(req as Request, res as Response, next as NextFunction);

    expect(IdentificationModel.findById).toHaveBeenCalledWith('identification-1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ status: 'success', data });
  });

  it('passes database errors to next', async () => {
    const error = new Error('Database failure');
    (IdentificationModel.findById as any).mockRejectedValue(error);
    req.params = { id: 'identification-1' };

    await controller.getIdentificationById(req as Request, res as Response, next as NextFunction);

    expect(next).toHaveBeenCalledWith(error);
  });
});
