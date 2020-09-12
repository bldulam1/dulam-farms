import { Dispatch, SetStateAction, createContext } from 'react'

export interface AppState {
  isDarkMode: boolean
  drawerOpen: boolean
}

export interface AppContext {
  state: AppState
  setState: Dispatch<SetStateAction<AppState>>
}

export default createContext<{
  state: AppState
  setState: Dispatch<SetStateAction<AppState>>
}>({
  state: {
    isDarkMode: false,
    drawerOpen: false,
  },
  setState: () => {},
})
