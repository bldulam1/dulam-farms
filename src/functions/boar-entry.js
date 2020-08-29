const { errorResponse, successResponse } = require('../utils/lambda.utils')
const { MongoClient } = require('mongodb')

exports.handler = function (event, context, callback) {
  const { DB_URL } = process.env
  const DB_NAME = `farm-management${'development' ? '-dev' : ''}`

  const DB_COLLECTION = 'boars'

  if (!DB_URL) return errorResponse(callback, 'Database URL is empty')

  MongoClient.connect(`${DB_URL}/${DB_NAME}`, (err, connection) => {
    if (err) return errorResponse(callback, err)

    connection
      .db(DB_NAME)
      .collection(DB_COLLECTION)
      .insertOne(JSON.parse(event.body), (err, result) => {
        if (err) return errorResponse(callback, err)

        connection.close()
        console.log('Saved boar entry')
        successResponse(callback, result)
      })
  })
}
