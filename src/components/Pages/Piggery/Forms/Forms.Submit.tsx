import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import FormsStyles from './Forms.Styles'
import React from 'react'
import { TransactionStatus } from './Forms.Interfaces'

export default (params: { status: TransactionStatus | undefined }) => {
  const classes = FormsStyles()
  const { status } = params
  return (
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
  )
}
