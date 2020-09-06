import { Controller, useForm } from 'react-hook-form'
import { IBoarEntry, TransactionStatus } from '../Forms/Forms.Interfaces'
import {
  createEntry,
  datesControlProps,
  handleServerResponse,
} from '../Forms/Forms.util'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { useSnackbar } from 'notistack'

export default (params: {
  open: boolean
  onClose: () => void
  status: TransactionStatus
  setStatus: React.Dispatch<React.SetStateAction<TransactionStatus>>
}) => {
  const { control, handleSubmit, reset } = useForm<IBoarEntry>()
  const { status, setStatus } = params
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = (data: IBoarEntry) => {
    const collection = 'boar'
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
  const basicInfoProps = {
    as: TextField,
    control,
    defaultValue: '',
    autoComplete: 'off',
    fullWidth: true,
    disabled: status === 'in progress',
    required: true,
  }

  return (
    <Dialog {...params}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>New Boar Form</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="small"
            disabled={status === 'in progress'}
          >
            {status === 'in progress' ? 'Submitting' : 'Submit'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
