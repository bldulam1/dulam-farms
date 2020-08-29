import { Controller, useForm } from 'react-hook-form'
import { ISowEntry, TransactionStatus } from './Forms.Interfaces'
import React, { useState } from 'react'
import {
  createEntry,
  datesControlProps,
  handleServerResponse,
} from './Forms.util'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Checkbox from '@material-ui/core/Checkbox'
import { FormControlLabel } from '@material-ui/core'
import FormsSubmit from './Forms.Submit'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { useSnackbar } from 'notistack'

export default () => {
  const { control, handleSubmit, reset } = useForm<ISowEntry>()
  const [isImported, setIsImported] = useState(false)

  const [status, setStatus] = useState<TransactionStatus>()
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = (data: ISowEntry) => {
    setStatus('in progress')
    const body = {
      ...data,
      birthDate: new Date(data.birthDate),
      recordDate: new Date(),
      isImported,
    }
    const collectionSingular = 'sow'
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

  const handleImportedToggle = () => setIsImported((s) => !s)

  const parentsControlProps = {
    as: TextField,
    control,
    defaultValue: '',
    autoComplete: 'off',
    fullWidth: true,
  }

  const _datesControlProps = datesControlProps(control)

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader title="New Sow Form" />
        <CardContent>
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
        </CardContent>
        <FormsSubmit status={status} />
      </form>
    </Card>
  )
}
