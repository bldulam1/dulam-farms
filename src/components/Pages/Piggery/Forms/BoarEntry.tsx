import { Controller, useForm } from 'react-hook-form'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { yyyyMMdd } from './Forms.util'

interface IHogEntry {
  boarId: string
  birthDate: string
  recordDate: string
  breed: string
}

export default () => {
  const { control, handleSubmit } = useForm<IHogEntry>()

  const onSubmit = (data: IHogEntry) => {
    const url = '/.netlify/functions/boar-entry'
    const body = {
      ...data,
      birthDate: new Date(data.birthDate),
      recordDate: new Date(),
    }
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }

    fetch(url, {
      method: 'post',
      headers,
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
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
        <CardHeader title="New Boar Form" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Basic Info</Typography>
              <Controller
                name="boarId"
                label="Boar ID"
                required
                {...parentsControlProps}
              />
              <Controller
                name="breed"
                label="Breed"
                required
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
