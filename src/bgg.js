import topGameIds from './topGameIds.json' assert { type: 'json' }
import { TooManyRetriesError, UnexpectedError, UserNotFoundError } from './errors.js'
import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'

const api = axios.create({ baseURL: 'https://boardgamegeek.com/xmlapi2' })
const maxRetries = 5
const retryDelay = 1000

api.interceptors.request.use((config) => {
  config.meta = config.meta || {}
  config.meta.retryCount = config.meta.retryCount || 0

  return config
})

api.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response
    } else if (response.status === 202) {
      const config = response.config
      const retryCount = config.meta.retryCount

      if (retryCount < maxRetries) {
        config.meta.retryCount += 1

        return new Promise((resolve) => {
          setTimeout(
            () => {
              resolve(api(config))
            },
            Math.pow(2, retryCount) * retryDelay
          )
        })
      } else {
        return Promise.reject(new TooManyRetriesError())
      }
    } else {
      return Promise.reject(new UnexpectedError(response.data))
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * Retrieves a list of board games from a user's collection.
 * @param {string} username - Username of the user whose collection to retrieve
 * @param {object} filters - Filters to apply to the collection
 * @returns {Promise<Array<{ id: number, name: string, rating: number }>>} A list of board games in the user's collection
 */
const getCollectionByUsername = async (username, filters) => {
  try {
    const params = { ...filters, username }

    const parser = new XMLParser({
      isArray: (tagName) => tagName === 'item',
      ignoreAttributes: false
    })

    const collection = []
    const collectionXml = await api.get(`/collection`, { params })
    const collectionJson = parser.parse(collectionXml.data)

    if (collectionJson.errors?.error.message === 'Invalid username specified') {
      throw new UserNotFoundError(username)
    }

    collectionJson.items.item?.forEach((game) =>
      collection.push({
        id: Number(game['@_objectid']),
        name: game.name['#text'],
        rating: Number(game.stats.rating['@_value'])
      })
    )

    return collection
  } catch (error) {
    throw error
  }
}

/**
 * Retrieves the top 100 board game IDs from a local JSON file.
 * @returns {Array<number>} An array of top 100 boardgame IDs
 */
const getTopGameIds = () => topGameIds

export { getCollectionByUsername, getTopGameIds }
