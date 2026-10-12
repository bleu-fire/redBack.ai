import { Request, Response } from 'express';
import { AIController } from './ai.controller';
import { AIService } from './ai.service';

describe('AIController - Naturalist Chat', () => {
  let mockService: Partial<AIService>;
  let controller: AIController;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockService = {
      askNaturalist: jest.fn().mockResolvedValue('The Mediterranean black widow is found under rocks.'),
    };
    controller = new AIController(mockService as any);
    mockNext = jest.fn();
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('responds with 200 and AI reply when message is provided', async () => {
    mockReq = {
      body: {
        message: 'Where do black widows live in Morocco?',
        context: { name: 'Mediterranean Black Widow', scientific: 'Latrodectus tredecimguttatus' },
      },
    };

    await controller.chatWithAI(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'success',
      reply: 'The Mediterranean black widow is found under rocks.',
    });
    expect(mockService.askNaturalist).toHaveBeenCalledWith(
      'Where do black widows live in Morocco?',
      { name: 'Mediterranean Black Widow', scientific: 'Latrodectus tredecimguttatus' },
      undefined
    );
  });

  it('calls next with 400 error when message is empty or missing', async () => {
    mockReq = { body: {} };

    await controller.chatWithAI(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
    const errorPassed = mockNext.mock.calls[0][0];
    expect(errorPassed.statusCode).toBe(400);
  });
});
