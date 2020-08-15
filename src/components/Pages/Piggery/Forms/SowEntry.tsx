import { Controller, useForm } from 'react-hook-form'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

interface ISowEntry {
  isImported: boolean
  birthDate: string
  purchaseDate: string
  nipplesCount: number
  fatherPigID: string
  motherPigID: string
  Breed: string
}

export default () => {
  const { control, handleSubmit } = useForm<ISowEntry>()
  const onSubmit = (data: ISowEntry) => {
    console.log(data)
  }

  const yyyyMMdd = (date: Date) => {
    const m = date.getMonth()
    const d = date.getDate()
    const mm = m >= 10 ? m : '0' + m
    const dd = d >= 10 ? d : '0' + m

    return [date.getFullYear(), mm, dd].map((v) => String(v)).join('-')
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader title="New Sow Form" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item sm={12} md={12}>
              <Controller
                as={Checkbox}
                name="isImported"
                defaultValue={false}
                control={control}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="h6">Parents</Typography>
              <Controller
                as={TextField}
                name="fatherPigID"
                control={control}
                defaultValue=""
                label="Father Pig ID"
                autoComplete="off"
                fullWidth
              />
              <Controller
                as={TextField}
                name="motherPigID"
                control={control}
                defaultValue=""
                label="Mother Pig ID"
                autoComplete="off"
                fullWidth
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="h6">Dates</Typography>
              <Controller
                as={TextField}
                name="birthDate"
                control={control}
                defaultValue={yyyyMMdd(new Date())}
                label="Birth Date"
                autoComplete="off"
                type="date"
                fullWidth
              />
              <Controller
                as={TextField}
                name="purchaseDate"
                control={control}
                defaultValue={yyyyMMdd(new Date())}
                label="Parchase Date"
                autoComplete="off"
                type="date"
                fullWidth
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
