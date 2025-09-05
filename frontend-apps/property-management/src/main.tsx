import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import AppContextProvider from './store/AppContextProvider.tsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SnackbarContextProvider from './store/snackbar/SnackbarContextProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CssBaseline />
        <BrowserRouter>
            <AppContextProvider>
                <SnackbarContextProvider>
                    <App />
                </SnackbarContextProvider>
            </AppContextProvider>
        </BrowserRouter>
    </StrictMode>
);
