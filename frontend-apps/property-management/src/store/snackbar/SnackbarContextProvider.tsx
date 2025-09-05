import { useState } from 'react';
import { Alert, Snackbar as MuiSnackbar, type AlertProps } from '@mui/material';
import SnackbarContext from './snackbar.context';

interface SnackbarContextProviderProps {
    children: React.ReactNode;
}

const SnackbarContextProvider = ({ children }: SnackbarContextProviderProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [severity, setSeverity] = useState<AlertProps['severity']>('success');

    const openSnackbar = (newMessage: string, newSeverity: AlertProps['severity'] = 'success') => {
        setOpen(true);
        setMessage(newMessage);
        setSeverity(newSeverity);
    };

    const handleClose = () => setOpen(false);

    return (
        <>
            <SnackbarContext value={{ openSnackbar }}>{children}</SnackbarContext>
            <MuiSnackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </MuiSnackbar>
        </>
    );
};

export default SnackbarContextProvider;
