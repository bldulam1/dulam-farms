import LandingAppBar from '../Landing/Landing.AppBar'
import React from 'react'
import Typography from '@material-ui/core/Typography'

export default () => {
  return (
    <div>
      <LandingAppBar />
      <div>
        <Typography variant="h3">Broiler</Typography>
      </div>
    </div>
  )
}
