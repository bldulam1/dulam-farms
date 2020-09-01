import { fetchData } from '../Forms/Forms.util'

export const wrapPromise = (promise: Promise<any>) => {
  let status = 'pending'
  let result: any

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

export interface SearchOption {
  limit: number
  skip: number
  sort: any
}
export const createResource = () => {
  return {
    boars: wrapPromise(
      fetchData(`/.netlify/functions/data?collection=boars&query=${{}}`)
    ),
  }
}
