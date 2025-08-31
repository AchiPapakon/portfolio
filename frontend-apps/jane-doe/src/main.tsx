import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/700.css';
import App from './App.tsx';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ebebeba6',
        },
        secondary: {
            main: '#291b0e',
        },
    },
    typography: {
        fontFamily: 'Nunito, sans-serif',
        fontWeightRegular: 700,
        fontWeightLight: 700,
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CssBaseline />
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);
