function fibonacci(num) {
  if (num < 2) {
    return 1
  }

  return num + fibonacci(num - 1)
}

exports.handler = async (event, context) => {
  console.log('Hello po')
  const num = event.queryStringParameters.num || 10

  return {
    statusCode: 200,
    body: 'Hello, World ' + fibonacci(Number(num)),
  }
}
