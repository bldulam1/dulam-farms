import React, { ChangeEvent, useContext } from 'react'

import AppBar from '@material-ui/core/AppBar'
import AppContext from '../../Main/App.Context'
import CameraIcon from '@material-ui/icons/PhotoCamera'
import LandingStyles from './Landing.Styles'
import Switch from '@material-ui/core/Switch'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

export default () => {
  const classes = LandingStyles()

  const appContext = useContext(AppContext)
  const { isDarkMode } = appContext.state

  const handleChange = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    appContext.setState({ isDarkMode: checked })
  }

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.toolbar}>
        <div className={classes.toolbarItem}>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Dulam Farms
          </Typography>
        </div>
        <div>
          <Switch value={isDarkMode} onChange={handleChange} />
        </div>
      </Toolbar>
    </AppBar>
  )
}
