import fastifyPlugin from 'fastify-plugin'
import * as handlers from './handlers.js'

export default fastifyPlugin((app, options, done) => {
  app.post('/api/measure-similarity', {
    handler: handlers.measureSimilarity,
    schema: {
      body: {
        type: 'object',
        required: ['usernames'],
        properties: {
          usernames: {
            type: 'array',
            items: { type: 'string' },
            minItems: 2,
            maxItems: 2
          }
        }
      },
      querystring: {
        type: 'object',
        properties: {
          entireCollection: { type: 'boolean' }
        }
      }
    }
  })

  done()
})
