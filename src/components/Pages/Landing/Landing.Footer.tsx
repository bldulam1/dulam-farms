import LandingStyles from './Landing.Styles'
import Link from '@material-ui/core/Link'
import React from 'react'
import Typography from '@material-ui/core/Typography'

export default () => {
  const classes = LandingStyles()
  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Footer
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Something here to give the footer a purpose!
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://dulam-farms.netlify.com">
          Dulam Farms
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </footer>
  )
}
