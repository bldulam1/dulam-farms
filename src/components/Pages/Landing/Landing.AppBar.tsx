import React, { useContext } from 'react'

import AppBar from '@material-ui/core/AppBar'
import AppContext from '../../Main/App.Context'
import AppDrawer from '../../Main/App.Drawer'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow'
import IconButton from '@material-ui/core/IconButton'
import LandingStyles from './Landing.Styles'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

export default () => {
  const classes = LandingStyles()

  const appContext = useContext(AppContext)
  const { isDarkMode } = appContext.state

  const toggleDarkMode = () => {
    appContext.setState((s) => ({ ...s, isDarkMode: !isDarkMode }))
  }

  return (
    <AppBar position="sticky" color={isDarkMode ? 'transparent' : 'primary'}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.toolbarItem}>
          <Link underline="none" color="inherit" component={RouterLink} to="/">
            <Typography variant="h6" color="inherit" noWrap>
              Dulam Farms
            </Typography>
          </Link>
        </div>
        <div>
          <IconButton
            onClick={toggleDarkMode}
            className={classes.brightnessIcon}
          >
            {isDarkMode ? <BrightnessLowIcon /> : <Brightness7Icon />}
          </IconButton>
          <AppDrawer />
        </div>
      </Toolbar>
    </AppBar>
  )
}
