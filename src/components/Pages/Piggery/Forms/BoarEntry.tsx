import { Controller, useForm } from 'react-hook-form'
import { IHogEntry, TransactionStatus } from './Forms.Interfaces'
import { createEntry, yyyyMMdd } from './Forms.util'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import FormsStyles from './Forms.Styles'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { useSnackbar } from 'notistack'

export default () => {
  const { control, handleSubmit, reset } = useForm<IHogEntry>()
  const [status, setStatus] = React.useState<TransactionStatus>()
  const { enqueueSnackbar } = useSnackbar()

  const classes = FormsStyles()

  const handleServerResponse = (res: { insertedId: string }) => {
    const variant = res.insertedId ? 'success' : 'error'
    const message = res.insertedId
      ? `Created new boar entry: ${res.insertedId}`
      : 'Failed to save boar entry'

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
    createEntry('boars', body, handleServerResponse)
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

  const datesControlProps = {
    defaultValue: yyyyMMdd(new Date()),
    disabled: status === 'in progress',
    as: TextField,
    control,
    type: 'date',
    fullWidth: true,
  }

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
