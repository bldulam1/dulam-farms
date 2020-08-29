import { Controller, useForm } from 'react-hook-form'
import { IHogEntry, TransactionStatus } from './Forms.Interfaces'
import React, { useState } from 'react'
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
import MenuItem from '@material-ui/core/MenuItem'
import ReactHookFormSelect from './ReactHookFormSelect'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { useSnackbar } from 'notistack'

export default () => {
  const { control, handleSubmit, reset } = useForm<IHogEntry>()

  const [status, setStatus] = useState<TransactionStatus>()
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = (data: IHogEntry) => {
    const collection = 'hog'
    setStatus('in progress')
    createEntry(
      `${collection}s`,
      {
        ...data,
        birthDate: new Date(data.birthDate),
        recordDate: new Date(),
      },
      handleServerResponse(collection, setStatus, enqueueSnackbar, reset)
    )
  }

  const _datesControlProps = datesControlProps(control)
  const parentsControlProps = {
    as: TextField,
    control,
    defaultValue: '',
    autoComplete: 'off',
    fullWidth: true,
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader title="New Hog Form" />
        <CardContent>
          <Typography variant="h6">Basic Info</Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="hogId"
                label="Hog ID"
                required
                {...parentsControlProps}
              />
              <ReactHookFormSelect
                id="sex"
                name="sex"
                label="Sex"
                control={control}
                defaultValue="Female"
                margin="normal"
                fullWidth
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </ReactHookFormSelect>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="nipplesCount"
                label="Number of nipples"
                type="number"
                required
                {...parentsControlProps}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Parents</Typography>
              <Controller
                name="fatherPigID"
                label="Father Pig ID"
                {...parentsControlProps}
              />
              <Controller
                name="motherPigID"
                label="Mother Pig ID"
                {...parentsControlProps}
              />
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
