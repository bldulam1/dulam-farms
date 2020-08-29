import { Controller, useForm } from 'react-hook-form'
import { IHogEntry, TransactionStatus } from './Forms.Interfaces'
import {
  createEntry,
  datesControlProps,
  handleServerResponse,
} from './Forms.util'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import FormsSubmit from './Forms.Submit'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { useSnackbar } from 'notistack'

export default () => {
  const { control, handleSubmit, reset } = useForm<IHogEntry>()
  const [status, setStatus] = React.useState<TransactionStatus>()
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = (data: IHogEntry) => {
    setStatus('in progress')
    const body = {
      ...data,
      birthDate: new Date(data.birthDate),
      recordDate: new Date(),
    }

    const collectionSingular = 'boar'
    createEntry(
      `${collectionSingular}s`,
      body,
      handleServerResponse(
        collectionSingular,
        setStatus,
        enqueueSnackbar,
        reset
      )
    )
  }

  const basicInfoProps = {
    as: TextField,
    control,
    defaultValue: '',
    autoComplete: 'off',
    fullWidth: true,
    disabled: status === 'in progress',
    required: true,
  }

  const _datesControlProps = datesControlProps(control)

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader title="New Boar Form" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Basic Info</Typography>
              <Controller name="boarId" label="Boar ID" {...basicInfoProps} />
              <Controller name="breed" label="Breed" {...basicInfoProps} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Dates</Typography>
              <Controller
                label="Birth Date"
                name="birthDate"
                required
                {..._datesControlProps}
              />
              <Controller
                label="Record Date"
                name="recordDate"
                InputProps={{
                  readOnly: true,
                }}
                {..._datesControlProps}
              />
            </Grid>
          </Grid>
        </CardContent>
        <FormsSubmit status={status} />
      </form>
    </Card>
  )
}
