// Default libs
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Fastify
import fastify from 'fastify';
import autoLoad from '@fastify/autoload';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import cors from '@fastify/cors';

// Local imports
import { swaggerConfig, swaggerUIConfig } from './src/config/swagger.js';
import loggerConfig from './src/config/logger.js';

// ENV
/// API
const HOST = process.env.FASTIFY_HOST || 'localhost';
const PORT = process.env.FASTIFY_PORT || 3000;

// Logger options
const opts = {};
opts.logger = loggerConfig;

// Autoload config
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// APP init
const app = fastify(opts);

// Register CORS
app.register(cors, {
    origin: true, // Allow all origins in development
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
});

// swagger
app.register(fastifySwagger, swaggerConfig);
app.register(fastifySwaggerUi, swaggerUIConfig);

// routes
app.register(autoLoad, {
    dir: join(__dirname, 'src/routes'),
});

// Errors handler
app.setErrorHandler(async (err, request, response) => {
    request.log.error({ err });
    response.code(err.statusCode || 500);
    return { error: err.message };
});

// Not found handler
app.setNotFoundHandler(async (request, response) => {
    response.code(404);
    return { error: 'Not found' };
});

// Run app
app.listen({ host: HOST, port: PORT }, (err) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
});
