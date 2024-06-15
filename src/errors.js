import createError from '@fastify/error'

const UserNotFoundError = createError('USER_NOT_FOUND', 'User %s not found', 404)
const EmptyCollectionError = createError('EMPTY_COLLECTION', 'User %s has no collection', 404)
const TooManyRetriesError = createError('TOO_MANY_RETRIES', 'Too many retries', 429)
const UnexpectedError = createError('UNEXPECTED_ERROR', 'Unexpected error: %s', 500)

export { UserNotFoundError, EmptyCollectionError, TooManyRetriesError, UnexpectedError }
