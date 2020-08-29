import { Controller, useForm } from 'react-hook-form'
import { IHogEntry, TransactionStatus } from './Forms.Interfaces'
import React, { useState } from 'react'
import { createEntry, yyyyMMdd } from './Forms.util'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import FormsStyles from './Forms.Styles'
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
  const classes = FormsStyles()

  const handleServerResponse = (res: { insertedId: string }) => {
    const variant = res.insertedId ? 'success' : 'error'
    const message = res.insertedId
      ? `Created new hog entry: ${res.insertedId}`
      : 'Failed to save hog entry'

    setStatus(variant)
    enqueueSnackbar(message, { variant })
    reset()
  }

  const onSubmit = (data: IHogEntry) => {
    setStatus('in progress')
    const body = {
      ...data,
      birthDate: new Date(data.birthDate),
      recordDate: new Date(),
    }
    createEntry('hogs', body, handleServerResponse)
  }

  const parentsControlProps = {
    as: TextField,
    control,
    defaultValue: '',
    autoComplete: 'off',
    fullWidth: true,
  }

  const datesControlProps = {
    defaultValue: yyyyMMdd(new Date()),
    as: TextField,
    control,
    type: 'date',
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
                {...datesControlProps}
              />
              <Controller
                label="Record Date"
                name="recordDate"
                InputProps={{
                  readOnly: true,
                }}
                {...datesControlProps}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="small"
            disabled={status === 'in progress'}
          >
            {status === 'in progress' ? 'Submitting' : 'Submit'}
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}
