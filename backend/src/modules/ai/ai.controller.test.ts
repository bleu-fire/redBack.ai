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
      askNaturalist: jest.fn().mockResolvedValue({
        reply: 'The Mediterranean black widow is found under rocks.',
        sources: [
          {
            title: 'Mediterranean Black Widow',
            scientificName: 'Latrodectus tredecimguttatus',
            family: 'Theridiidae',
            sourceType: 'species_catalog',
            section: 'Toxicity & Venom Profile (DEADLY)',
            pageOrChunk: 'chunk-1',
            citation: 'redBack.ai Catalog [Family Theridiidae] §1',
          },
        ],
      }),
    };
    controller = new AIController(mockService as any);
    mockNext = jest.fn();
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('responds with 200, AI reply, and grounded source references when message is provided', async () => {
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
      sources: [
        {
          title: 'Mediterranean Black Widow',
          scientificName: 'Latrodectus tredecimguttatus',
          family: 'Theridiidae',
          sourceType: 'species_catalog',
          section: 'Toxicity & Venom Profile (DEADLY)',
          pageOrChunk: 'chunk-1',
          citation: 'redBack.ai Catalog [Family Theridiidae] §1',
        },
      ],
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

  describe('Persistent Conversations (RAB-11)', () => {
    const mockUserId = 'user-12345';
    const mockUser = { _id: mockUserId } as any;

    it('creates a persistent conversation for authenticated user', async () => {
      const mockConversation = {
        _id: 'conv-1',
        userId: mockUserId,
        title: 'Discussion: Redback Spider',
        messages: [],
      };
      mockService.createConversation = jest.fn().mockResolvedValue(mockConversation);

      const authReq: any = {
        user: mockUser,
        body: {
          title: 'Discussion: Redback Spider',
          speciesContext: { name: 'Redback Spider', scientific: 'Latrodectus hasselti' },
        },
      };

      await controller.createConversation(authReq, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockConversation,
      });
      expect(mockService.createConversation).toHaveBeenCalledWith(
        mockUserId,
        'Discussion: Redback Spider',
        { name: 'Redback Spider', scientific: 'Latrodectus hasselti' },
        undefined
      );
    });

    it('returns 401 when unauthenticated user attempts to create conversation', async () => {
      const unauthReq: any = { user: undefined, body: {} };

      await controller.createConversation(unauthReq, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      const err = mockNext.mock.calls[0][0];
      expect(err.statusCode).toBe(401);
    });

    it('retrieves user-isolated conversations for authenticated user', async () => {
      const mockList = [
        { _id: 'conv-1', title: 'Discussion 1' },
        { _id: 'conv-2', title: 'Discussion 2' },
      ];
      mockService.getUserConversations = jest.fn().mockResolvedValue(mockList);

      const authReq: any = { user: mockUser };

      await controller.getUserConversations(authReq, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        results: 2,
        data: mockList,
      });
      expect(mockService.getUserConversations).toHaveBeenCalledWith(mockUserId);
    });

    it('continues conversation with new user message and records assistant reply with sources', async () => {
      const mockResult = {
        reply: 'Redback venom contains alpha-latrotoxin.',
        sources: [
          {
            title: 'Redback Spider',
            citation: 'redBack.ai Catalog §1',
            sourceType: 'species_catalog' as const,
          },
        ],
        conversation: {
          _id: 'conv-1',
          messages: [
            { role: 'user', content: 'What venom does it have?' },
            { role: 'assistant', content: 'Redback venom contains alpha-latrotoxin.' },
          ],
        },
      };
      mockService.addMessageToConversation = jest.fn().mockResolvedValue(mockResult);

      const authReq: any = {
        user: mockUser,
        params: { id: 'conv-1' },
        body: { message: 'What venom does it have?' },
      };

      await controller.sendMessage(authReq, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        reply: mockResult.reply,
        sources: mockResult.sources,
        data: mockResult.conversation,
      });
      expect(mockService.addMessageToConversation).toHaveBeenCalledWith(
        'conv-1',
        mockUserId,
        'What venom does it have?'
      );
    });

    it('rejects sending empty message with 400 error', async () => {
      const authReq: any = {
        user: mockUser,
        params: { id: 'conv-1' },
        body: { message: '' },
      };

      await controller.sendMessage(authReq, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      const err = mockNext.mock.calls[0][0];
      expect(err.statusCode).toBe(400);
    });

    it('deletes conversation for authenticated owner', async () => {
      mockService.deleteConversation = jest.fn().mockResolvedValue(true);

      const authReq: any = {
        user: mockUser,
        params: { id: 'conv-1' },
      };

      await controller.deleteConversation(authReq, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Conversation deleted successfully',
      });
      expect(mockService.deleteConversation).toHaveBeenCalledWith('conv-1', mockUserId);
    });
  });
});
