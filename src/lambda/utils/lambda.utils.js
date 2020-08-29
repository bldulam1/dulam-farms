const { MongoClient } = require('mongodb')

export function errorResponse(callback, err) {
  console.error(err)
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({ error: err }),
  })
}

export function successResponse(callback, res) {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(res),
  })
}

export function createDBEntry(url, callback, data, dbName, collectionName) {
  MongoClient.connect(url, (err, connection) => {
    if (err) return errorResponse(callback, err)

    connection
      .db(dbName)
      .collection(collectionName)
      .insertOne(JSON.parse(data), (err, result) => {
        if (err) return errorResponse(callback, err)

        connection.close()
        console.log('Saved boar entry')
        successResponse(callback, result)
      })
  })
}
