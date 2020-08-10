import { createMuiTheme } from '@material-ui/core/styles'

export default (isDarkMode: boolean) => {
    return createMuiTheme({
        typography: {
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                'Barlow',
                '"Segoe UI"',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
        },
        palette: {
            type: isDarkMode ? 'dark' : 'light',
            primary: {
                main: isDarkMode ? '#e85575' : '#891438',
            },
            secondary: {
                main: isDarkMode ? '#ffcf40' : '#DF9B6D',
            },
        },
    })
}
