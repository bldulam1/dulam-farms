import React, { ChangeEvent, useContext } from 'react'

import AppBar from '@material-ui/core/AppBar'
import AppContext from '../../Main/App.Context'
import LandingStyles from './Landing.Styles'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
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
          <Switch value={isDarkMode} onChange={handleChange} />
        </div>
      </Toolbar>
    </AppBar>
  )
}
