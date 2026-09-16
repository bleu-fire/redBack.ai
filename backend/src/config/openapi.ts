export const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'redBack.ai API',
    version: '1.0.0',
    description:
      'Backend REST API for redBack.ai spider identification, taxonomy discovery, and educational field notes.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local Development Server',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '65a1234567890abcdef12345' },
          fullname: { type: 'string', example: 'Alex Explorer' },
          email: { type: 'string', example: 'alex@example.com' },
          avatarUrl: { type: 'string', example: 'https://example.com/avatar.jpg' },
        },
      },
      Species: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '65a1234567890abcdef12345' },
          scientificName: { type: 'string', example: 'Latrodectus hasselti' },
          commonName: { type: 'string', example: 'Redback spider' },
          family: { type: 'string', example: 'Theridiidae' },
          genus: { type: 'string', example: 'Latrodectus' },
          description: { type: 'string', example: 'Highly venomous spider native to Australia.' },
          habitat: { type: 'string', example: 'Urban areas, sheds, outdoor furniture' },
          distribution: { type: 'string', example: 'Australia wide' },
          behavior: { type: 'string', example: 'Nocturnal web-builder' },
          venomInfo: { type: 'string', example: 'Latrodectism; antivenom available' },
          conservationStatus: { type: 'string', example: 'Secure / Common' },
          imageUrls: {
            type: 'array',
            items: { type: 'string' },
            example: ['https://example.com/redback.jpg'],
          },
        },
      },
      Prediction: {
        type: 'object',
        properties: {
          speciesId: { type: 'string', example: '65a1234567890abcdef12345' },
          scientificName: { type: 'string', example: 'Latrodectus hasselti' },
          commonName: { type: 'string', example: 'Redback spider' },
          confidence: { type: 'number', example: 0.94 },
          confidenceBand: { type: 'string', enum: ['high', 'medium', 'low'], example: 'high' },
        },
      },
      Identification: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '65a1234567890abcdef12345' },
          userId: { type: 'string', example: '65a9876543210fedcba98765' },
          imageUrl: { type: 'string', example: '/uploads/spider-sample.jpg' },
          status: { type: 'string', enum: ['pending', 'completed', 'failed'], example: 'completed' },
          predictions: {
            type: 'array',
            items: { $ref: '#/components/schemas/Prediction' },
          },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      LearningTopic: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '65a1234567890abcdef12345' },
          slug: { type: 'string', example: 'spider-anatomy' },
          title: { type: 'string', example: 'Spider Anatomy: Cephalothorax & Abdomen' },
          content: { type: 'string', example: 'Spiders have two main body segments...' },
          category: { type: 'string', example: 'Anatomy' },
          sourceUrl: { type: 'string', example: 'https://australian.museum' },
        },
      },
    },
  },
  paths: {
    '/health': {
      get: {
        summary: 'Server Health Check',
        tags: ['System'],
        responses: {
          200: { description: 'Server is healthy' },
        },
      },
    },
    '/api/v1/auth/register': {
      post: {
        summary: 'Register a new user',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['fullname', 'email', 'password'],
                properties: {
                  fullname: { type: 'string', example: 'Alex Explorer' },
                  email: { type: 'string', example: 'alex@example.com' },
                  password: { type: 'string', example: 'secret123' },
                  avatarUrl: { type: 'string', example: 'https://example.com/avatar.jpg' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'User created' },
          400: { description: 'Validation error' },
          409: { description: 'User already exists' },
        },
      },
    },
    '/api/v1/auth/login': {
      post: {
        summary: 'Log in an existing user',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', example: 'alex@example.com' },
                  password: { type: 'string', example: 'secret123' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Login successful (returns token & user)' },
          401: { description: 'Invalid credentials' },
        },
      },
    },
    '/api/v1/auth/me': {
      get: {
        summary: 'Get current user profile',
        tags: ['Auth'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: 'Current user profile' },
          401: { description: 'Unauthorized' },
        },
      },
    },
    '/api/v1/auth/status': {
      get: {
        summary: 'Auth service status',
        tags: ['Auth'],
        responses: {
          200: { description: 'Auth service operational' },
        },
      },
    },
    '/api/v1/species': {
      get: {
        summary: 'List all spider species',
        tags: ['Species'],
        parameters: [
          {
            name: 'search',
            in: 'query',
            description: 'Filter by scientificName, commonName, family, or genus',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'Array of spider species',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Species' },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a new spider species',
        tags: ['Species'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Species' },
            },
          },
        },
        responses: {
          201: { description: 'Species created' },
          400: { description: 'Missing required fields' },
          409: { description: 'Species already exists' },
        },
      },
    },
    '/api/v1/species/search': {
      get: {
        summary: 'Search spider species with pagination',
        tags: ['Species'],
        parameters: [
          { name: 'q', in: 'query', schema: { type: 'string' }, example: 'redback' },
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } },
        ],
        responses: {
          200: { description: 'Paginated species results' },
        },
      },
    },
    '/api/v1/species/{id}': {
      get: {
        summary: 'Get species by MongoDB ID',
        tags: ['Species'],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          200: { description: 'Species details' },
          404: { description: 'Species not found' },
        },
      },
      patch: {
        summary: 'Update species by ID',
        tags: ['Species'],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Species' },
            },
          },
        },
        responses: {
          200: { description: 'Species updated' },
          404: { description: 'Species not found' },
        },
      },
      delete: {
        summary: 'Delete species by ID',
        tags: ['Species'],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          200: { description: 'Species deleted' },
          404: { description: 'Species not found' },
        },
      },
    },
    '/api/v1/identifications': {
      get: {
        summary: 'List spider identifications',
        tags: ['Identifications'],
        responses: {
          200: { description: 'Array of identifications' },
        },
      },
      post: {
        summary: 'Create spider identification (image upload)',
        tags: ['Identifications'],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  image: { type: 'string', format: 'binary' },
                  imageUrl: { type: 'string', example: 'https://example.com/spider.jpg' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Identification processed with predictions' },
          400: { description: 'Image required' },
        },
      },
    },
    '/api/v1/identifications/{id}': {
      get: {
        summary: 'Get identification by ID (populated with species details)',
        tags: ['Identifications'],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          200: { description: 'Identification with populated predictions' },
          404: { description: 'Not found' },
        },
      },
    },
    '/api/v1/learning': {
      get: {
        summary: 'List all learning topics',
        tags: ['Learning'],
        parameters: [
          { name: 'category', in: 'query', schema: { type: 'string' }, example: 'Anatomy' },
        ],
        responses: {
          200: { description: 'List of educational topics' },
        },
      },
      post: {
        summary: 'Create educational learning topic',
        tags: ['Learning'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['slug', 'title', 'content'],
                properties: {
                  slug: { type: 'string', example: 'spider-anatomy' },
                  title: { type: 'string', example: 'Spider Anatomy' },
                  content: { type: 'string', example: 'Detailed lesson text...' },
                  category: { type: 'string', example: 'Anatomy' },
                  sourceUrl: { type: 'string', example: 'https://australian.museum' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Topic created' },
          400: { description: 'Missing required fields' },
          409: { description: 'Topic with slug already exists' },
        },
      },
    },
    '/api/v1/learning/topics/{slug}': {
      get: {
        summary: 'Get learning topic by slug',
        tags: ['Learning'],
        parameters: [
          { name: 'slug', in: 'path', required: true, schema: { type: 'string' }, example: 'spider-anatomy' },
        ],
        responses: {
          200: { description: 'Topic details' },
          404: { description: 'Topic not found' },
        },
      },
    },
  },
};

