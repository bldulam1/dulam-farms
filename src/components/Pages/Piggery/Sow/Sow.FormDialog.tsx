import { Controller, useForm } from 'react-hook-form'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import { ISowEntry, TransactionStatus } from '../Forms/Forms.Interfaces'
import React, { useState } from 'react'
import {
  createEntry,
  datesControlProps,
  handleServerResponse,
} from '../Forms/Forms.util'

import Checkbox from '@material-ui/core/Checkbox'
import DialogActions from '@material-ui/core/DialogActions'
import { DialogContent } from '@material-ui/core'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormsSubmit from '../Forms/Forms.Submit'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { useSnackbar } from 'notistack'

export default (props: {
  dialogProps: DialogProps
  status: TransactionStatus
  setStatus: React.Dispatch<React.SetStateAction<TransactionStatus>>
}) => {
  const [isImported, setIsImported] = useState(false)
  const { control, handleSubmit, reset } = useForm<ISowEntry>()
  const { status, setStatus } = props
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = (data: ISowEntry) => {
    const collection = 'sow'
    setStatus('in progress')
    createEntry(
      `${collection}s`,
      {
        ...data,
        birthDate: new Date(data.birthDate),
        recordDate: new Date(),
        purchaseDate: isImported
          ? new Date(data.purchaseDate)
          : new Date(data.birthDate),
        isImported,
      },
      handleServerResponse(collection, setStatus, enqueueSnackbar, reset)
    )
  }

  const handleImportedToggle = () => setIsImported((s) => !s)

  const _datesControlProps = datesControlProps(control)
  const parentsControlProps = {
    as: TextField,
    control,
    defaultValue: '',
    autoComplete: 'off',
    fullWidth: true,
  }

  return (
    <Dialog {...props.dialogProps}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>New Sow Form</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isImported}
                        onClick={handleImportedToggle}
                      />
                    }
                    label="Is Imported"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="sowID"
                    label="New Sow ID"
                    required
                    {...parentsControlProps}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="breed"
                    label="Breed"
                    required
                    {...parentsControlProps}
                  />
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
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Parents</Typography>
              <Controller
                name="fatherPigID"
                label="Father Pig ID"
                required={!isImported}
                disabled={isImported}
                {...parentsControlProps}
              />
              <Controller
                name="motherPigID"
                label="Mother Pig ID"
                required={!isImported}
                disabled={isImported}
                {...parentsControlProps}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant="h6">Dates</Typography>
              <Controller
                label="Birth Date"
                name="birthDate"
                required
                {..._datesControlProps}
              />
              <Controller
                disabled={!isImported}
                required={isImported}
                label="Parchase Date"
                name="purchaseDate"
                {..._datesControlProps}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <FormsSubmit status={status} />
        </DialogActions>
      </form>
    </Dialog>
  )
}
