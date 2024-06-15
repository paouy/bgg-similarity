import * as useCases from './useCases/index.js'

const measureSimilarity = async (request, reply) => {
  try {
    const { usernames } = request.body
    const { entireCollection } = request.query
    const { cosineSimilarity } = await useCases.measureSimilarity(
      usernames[0],
      usernames[1],
      Boolean(entireCollection)
    )

    return reply.send({ score: cosineSimilarity })
  } catch (error) {
    throw error
  }
}

export { measureSimilarity }
