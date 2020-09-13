import AppContext, { AppState } from './App.Context'
import React, { useState } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import AppTheme from './App.Theme'
import BroilerMain from '../Pages/Broiler/Broiler.Main'
import CattleMain from '../Pages/Cattle/Cattle.Main'
import CssBaseline from '@material-ui/core/CssBaseline'
import LandingAppBar from '../Pages/Landing/Landing.AppBar'
import LandingPage from '../Pages/Landing/LandingPage'
import PiggeryMain from '../Pages/Piggery/Piggery.Main'
import { SnackbarProvider } from 'notistack'
import { ThemeProvider } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export default () => {
  const [state, setState] = useState<AppState>({
    isDarkMode: useMediaQuery('(prefers-color-scheme: dark)'),
    drawerOpen: false,
  })

  const theme = React.useMemo(() => AppTheme(state.isDarkMode), [
    state.isDarkMode,
  ])

  return (
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={{ setState, state }}>
          <Router>
            <CssBaseline />
            <LandingAppBar />
            <Switch>
              <Route path="/piggery/:subcategory">
                <PiggeryMain />
              </Route>
              <Route path="/broiler">
                <BroilerMain />
              </Route>
              <Route path="/cattle">
                <CattleMain />
              </Route>
              <Route path="/">
                <LandingPage />
              </Route>
            </Switch>
          </Router>
        </AppContext.Provider>
      </ThemeProvider>
    </SnackbarProvider>
  )
}
