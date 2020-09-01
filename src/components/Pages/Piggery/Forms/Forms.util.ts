import { Control } from 'react-hook-form'
import { OptionsObject } from 'notistack'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import { TransactionStatus } from './Forms.Interfaces'

export const yyyyMMdd = (date: Date) => {
  const m = date.getMonth()
  const d = date.getDate()
  const mm = m >= 10 ? m : '0' + m
  const dd = d >= 10 ? d : '0' + d

  const yyyy = date.getFullYear()

  return [yyyy, mm, dd].map((v) => String(v)).join('-')
}

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

export const createEntry = (
  collection: string,
  body: any,
  handleServerResponse: (res: { insertedId: string }) => void
) => {
  const url = `/.netlify/functions/data?collection=${collection}`

  fetch(url, {
    method: 'post',
    headers,
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then(handleServerResponse)
}

export const handleServerResponse = (
  collection: string,
  setStatus: (value: React.SetStateAction<TransactionStatus>) => void,
  enqueueSnackbar: (
    message: React.ReactNode,
    options: OptionsObject
  ) => React.ReactText,
  reset: (values?: any, omitResetState?: any) => void
) => {
  return (res: { insertedId: string }) => {
    console.log(res)

    const variant = res.insertedId ? 'success' : 'error'
    const message = res.insertedId
      ? `Created new ${collection} entry: ${res.insertedId}`
      : `Failed to save ${collection} entry`

    setStatus(variant)
    enqueueSnackbar(message, { variant })
    reset()
  }
}

export const datesControlProps = (control: Control<any>) => ({
  defaultValue: yyyyMMdd(new Date()),
  as: TextField,
  control,
  type: 'date',
  fullWidth: true,
})

export interface FetchResult {
  total: number
  subset: []
}

export const fetchData = (url: string): Promise<FetchResult> => {
  return fetch(url, { headers })
    .then((res) => res.json())
    .then((res: FetchResult) => res)
}
