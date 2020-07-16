const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Ticket Management API',
        description: 'Base URL: localhost:3000',
        contact: {
          name: 'Amazing'
        },
        servers: ['localhost:3000']
      }
    },
    apis: ['../docs/*.js']
  };
module.exports = swaggerOptions;
