import { Controller, useForm } from 'react-hook-form'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'
import ReactHookFormSelect from './ReactHookFormSelect'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { yyyyMMdd } from './Forms.util'

interface IHogEntry {
  hogId: string
  birthDate: string
  recordDate: string
  fatherPigID: string
  motherPigID: string
  sex: 'Male' | 'Female'
  nipplesCount: number
}

export default () => {
  const { control, handleSubmit } = useForm<IHogEntry>()

  const onSubmit = (data: IHogEntry) => {
    console.log(data)
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
