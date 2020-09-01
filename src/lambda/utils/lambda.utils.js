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
        const { insertedId, insertedCount } = result
        successResponse(callback, { insertedId, insertedCount })
      })
  })
}

export function fetchDBEntry({
  dbURL,
  dbName,
  dbCollection,
  callback,
  options,
}) {
  const url = `${dbURL}/${dbName}`
  MongoClient.connect(url, mongoOptions, (err, connection) => {
    if (err) return errorResponse(callback, err)

    const collection = connection.db(dbName).collection(dbCollection)

    const countQuery = collection.count({})
    const findQuery = collection
      .find({})
      .sort(options.sort)
      .skip(options.page * options.limit)
      .limit(options.limit)
      .toArray()

    Promise.all([countQuery, findQuery]).then(
      ([total, subset]) => {
        connection.close()
        successResponse(callback, {
          total,
          subset,
        })
      },
      (err) => errorResponse(callback, err)
    )
  })
}
