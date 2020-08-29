const { errorResponse, createDBEntry } = require('../utils/lambda.utils')

exports.handler = (event, context, callback) => {
  const { DB_URL } = process.env
  const DB_COLLECTION = event.queryStringParameters.collection

  if (!DB_URL) return errorResponse(callback, 'Database URL is empty')
  if (!DB_COLLECTION) return errorResponse(callback, 'Database collection is required')

  const DB_NAME = 'development' ? 'farm-management-dev' : 'farm-management'
  const url = `${DB_URL}/${DB_NAME}`

  createDBEntry(url, callback, event.body, DB_NAME, DB_COLLECTION)
}
