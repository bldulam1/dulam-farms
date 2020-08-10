import AppContext, { AppState } from './App.Context'
import React, { useState } from 'react'
import { ThemeProvider, createMuiTheme, useMediaQuery } from '@material-ui/core'

import AppTheme from './App.Theme'
import LandingPage from '../Pages/Landing/LandingPage'

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
                <LandingPage />
            </AppContext.Provider>
        </ThemeProvider>
    )
}
