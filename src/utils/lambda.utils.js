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
