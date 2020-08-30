const { MongoClient } = require('mongodb')

const mongoOptions = { useUnifiedTopology: true }

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

export function createDBEntry({ dbURL, callback, data, dbName, dbCollection }) {
  const url = `${dbURL}/${dbName}`
  MongoClient.connect(url, mongoOptions, (err, connection) => {
    if (err) return errorResponse(callback, err)

    connection
      .db(dbName)
      .collection(dbCollection)
      .insertOne(JSON.parse(data), (err, result) => {
        if (err) return errorResponse(callback, err)

        connection.close()
        successResponse(callback, result)
      })
  })
}

export function fetchDBEntry({ dbURL, dbName, dbCollection, callback }) {
  const url = `${dbURL}/${dbName}`
  MongoClient.connect(url, mongoOptions, (err, connection) => {
    if (err) return errorResponse(callback, err)

    connection
      .db(dbName)
      .collection(dbCollection)
      .find({})
      .toArray((err, result) => {
        if (err && !result && !result.length) {
          return errorResponse(callback, err)
        }
        successResponse(callback, result)
        console.log(result)
      })
  })
}
