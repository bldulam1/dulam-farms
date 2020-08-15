import { Controller, useForm } from 'react-hook-form'
import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Checkbox from '@material-ui/core/Checkbox'
import { FormControlLabel } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

interface ISowEntry {
  birthDate: string
  purchaseDate: string
  nipplesCount: number
  fatherPigID: string
  motherPigID: string
  Breed: string
}

const yyyyMMdd = (date: Date) => {
  const m = date.getMonth()
  const d = date.getDate()
  const mm = m >= 10 ? m : '0' + m
  const dd = d >= 10 ? d : '0' + m

  return [date.getFullYear(), mm, dd].map((v) => String(v)).join('-')
}

export default () => {
  const { control, handleSubmit } = useForm<ISowEntry>()
  const [isImported, setIsImported] = useState(false)

  const handleImportedToggle = () => {
    setIsImported((s) => !s)
  }

  const onSubmit = (data: ISowEntry) => {
    console.log(data)
  }

  const parentsControlProps = {
    as: TextField,
    control,
    defaultValue: '',
    autoComplete: 'off',
    fullWidth: true,
    disabled: isImported,
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
        <CardHeader title="New Sow Form" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item sm={12} md={12}>
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
            <Grid item xs={12} sm={6} md={6}>
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
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant="h6">Dates</Typography>
              <Controller
                label="Birth Date"
                name="birthDate"
                {...datesControlProps}
              />
              <Controller
                disabled={!isImported}
                label="Parchase Date"
                name="purchaseDate"
                {...datesControlProps}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="small"
          >
            Submit
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}
