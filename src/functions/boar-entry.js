const { MongoClient } = require('mongodb')

const { DB_URL } = process.env
const DB_NAME = [
  'farm-management',
  process.env.NODE_ENV === 'development' ? 'dev' : '',
].join('-')
const DB_COLLECTION = 'boars'

function errorResponse(callback, err) {
  console.error(err)
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({ error: err }),
  })
}

function successResponse(callback, res) {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(res),
  })
}

console.log(DB_URL)

exports.handler = function (event, context, callback) {
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
