import { successResponse } from '../utils/lambda.utils'

exports.handler = (event, context, callback) => {
  successResponse(callback, { test: 'Hello' })
}
