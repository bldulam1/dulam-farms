const {
  errorResponse,
  createDBEntry,
  fetchDBEntry,
} = require('../utils/lambda.utils')

exports.handler = (event, context, callback) => {
  const dbURL = process.env.DB_URL
  const dbCollection = event.queryStringParameters.collection

  if (!dbURL) return errorResponse(callback, 'Database URL is empty')
  if (!dbCollection) {
    return errorResponse(callback, 'Database collection is required')
  }

  const dbName = process.env.DB_NAME || 'farm-management-dev'
  console.log(dbName)

  switch (event.httpMethod) {
    case 'POST':
      const data = event.body
      return createDBEntry({
        dbURL,
        dbName,
        dbCollection,
        callback,
        data,
      })
    case 'GET':
      let options = {}
      if (event.queryStringParameters.options) {
        options = JSON.parse(event.queryStringParameters.options)
      }

      return fetchDBEntry({ dbURL, dbName, dbCollection, callback, options })

    default:
      return errorResponse(callback, 'Unknown request')
  }
}
