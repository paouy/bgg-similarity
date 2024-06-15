import * as bgg from '../bgg.js'
import { EmptyCollectionError } from '../errors.js'
import computeCosineSimilarity from 'compute-cosine-similarity'

/**
 * Measures the similarity between two users' board game preferences.
 * @param {string} username1
 * @param {string} username2
 * @param {boolean} entireCollection - Whether to consider all games in the collection or only top games
 * @returns {Promise<{ cosineSimilarity: number }>} An object containing a cosine similarity score between 0 and 1
 */
const measureSimilarity = async (username1, username2, entireCollection) => {
  try {
    const collectionFilters = { rated: 1, brief: 1, stats: 1 }

    if (!entireCollection) {
      const topGameIds = bgg.getTopGameIds()

      collectionFilters.id = topGameIds.join()
    }

    const [collection1, collection2] = await Promise.all([
      bgg.getCollectionByUsername(username1, collectionFilters),
      bgg.getCollectionByUsername(username2, collectionFilters)
    ])

    if (!collection1?.length) {
      throw new EmptyCollectionError(username1)
    }

    if (!collection1?.length) {
      throw new EmptyCollectionError(username2)
    }

    const gameIds1 = collection1.map((game) => game.id)
    const gameIds2 = collection2.map((game) => game.id)
    const uniqueGameIds = [...new Set(gameIds1.concat(gameIds2))]

    const ratings1 = uniqueGameIds.map(
      (gameId) => collection1.find((game) => game.id === gameId)?.rating ?? 0
    )
    const ratings2 = uniqueGameIds.map(
      (gameId) => collection2.find((game) => game.id === gameId)?.rating ?? 0
    )

    const cosineSimilarity = computeCosineSimilarity(ratings1, ratings2)

    return { cosineSimilarity: Number(cosineSimilarity.toFixed(2)) }
  } catch (error) {
    throw error
  }
}

export default measureSimilarity
