import { createContext } from 'react'

export type Theme = 'dark' | 'light'

export type ThemeProviderProps = {
	children: React.ReactNode
	defaultTheme?: Theme
	storageKey?: string
}

interface ThemeProviderState {
	theme: Theme
	setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
	theme: 'dark',
	setTheme: () => null,
}

export const ThemeProviderContext =
	createContext<ThemeProviderState>(initialState)
