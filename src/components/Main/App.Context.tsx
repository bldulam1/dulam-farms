import { Dispatch, SetStateAction, createContext } from 'react'

export interface AppState {
  isDarkMode: boolean
}

export interface AppContext {
  state: AppState
  setState: Dispatch<SetStateAction<AppState>>
}

export default createContext({
  state: {
    isDarkMode: false,
  },
  setState: (v: AppState) => {},
})
