import AppContext, { AppState } from './App.Context'
import React, { useState } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import AppTheme from './App.Theme'
import BroilerMain from '../Pages/Broiler/Broiler.Main'
import CattleMain from '../Pages/Cattle/Cattle.Main'
import LandingPage from '../Pages/Landing/LandingPage'
import PiggeryMain from '../Pages/Piggery/Piggery.Main'
import { ThemeProvider } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export default () => {
  const [state, setState] = useState<AppState>({
    isDarkMode: useMediaQuery('(prefers-color-scheme: dark)'),
  })

  const theme = React.useMemo(() => AppTheme(state.isDarkMode), [
    state.isDarkMode,
  ])

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{ setState, state }}>
        <Router>
          <Switch>
            <Route path="/piggery">
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
  )
}
