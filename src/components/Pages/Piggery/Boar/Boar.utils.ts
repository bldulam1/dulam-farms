import { FetchResult, fetchData } from '../Forms/Forms.util'

export const wrapPromise = (promise: Promise<any>) => {
  let status = 'pending'
  let result: FetchResult | any

  let suspender = promise.then(
    (res) => {
      status = 'success'
      result = res
    },
    (err) => {
      status = 'error'
      result = err
    }
  )

  return {
    read() {
      switch (status) {
        case 'pending':
          throw suspender
        case 'error':
          throw result

        default:
          return result
      }
    },
  }
}

export const defaultSearchOptions = {
  sort: {},
  page: 0,
  limit: 5,
}
export interface SearchOption {
  limit: number
  skip: number
  sort: any
}
export const createResource = () => {
  return {
    boars: wrapPromise(
      fetchData(
        `/.netlify/functions/data?collection=boars&options=${JSON.stringify(
          defaultSearchOptions
        )}`
      )
    ),
  }
}
