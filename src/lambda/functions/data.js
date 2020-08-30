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
  const dbName = 'development' ? 'farm-management-dev' : 'farm-management-prod'
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
      const query = event.queryStringParameters.query
        ? JSON.parse(event.queryStringParameters.query)
        : {}

      console.log(query)

      return fetchDBEntry({ dbURL, dbName, dbCollection, callback })

    default:
      return errorResponse(callback, 'Unknown request')
  }
}
