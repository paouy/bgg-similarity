import Fastify from 'fastify'
import cors from '@fastify/cors'
import routes from './routes.js'

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty'
    }
  }
})

app.register(cors)
app.register(routes)

const start = () => {
  try {
    app.listen({ host: 'localhost', port: 4321 })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
