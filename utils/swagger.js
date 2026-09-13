import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'API documentation for our task manager backend'
    },
    servers: [
      {
        url: '/',
        description: 'Current API host'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        RegisterInput: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'Mohamed Ahmed' },
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            password: { type: 'string', format: 'password', example: 'Password123!' }
          }
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            password: { type: 'string', format: 'password', example: 'Password123!' }
          }
        },
        TokenResponse: {
          type: 'object',
          properties: {
            token: { type: 'string', description: 'JWT access token' }
          }
        },
        TaskInput: {
          type: 'object',
          required: ['title'],
          properties: {
            title: { type: 'string', example: 'Learn Swagger' },
            description: { type: 'string', example: 'Document the API endpoints' },
            status: { type: 'string', enum: ['pending', 'in progress', 'completed'], example: 'pending' },
            dueDate: { type: 'string', format: 'date', example: '2026-09-15' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    },
  },
  apis: ['./index.js', './routes/*.js']
};

export const swaggerSpec = swaggerJSDoc(options);
