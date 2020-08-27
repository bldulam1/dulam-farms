function fibonacci(num) {
  if (num < 2) {
    return 1
  }

  return num + fibonacci(num - 1)
}

exports.handler = async (event, context) => {
  let { num } = event.queryStringParameters
  console.log(event.queryStringParameters)
  if (num === undefined) {
    return {
      statusCode: 404,
      body: `Error`,
    }
  }

  return {
    statusCode: 200,
    body: `Hello po ${fibonacci(Number(num))}`,
  }
}
