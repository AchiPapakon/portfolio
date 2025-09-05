import type { AlertProps } from '@mui/material';
import { createContext } from 'react';

interface SnackbarContextInterface {
    openSnackbar: (message: string, severity?: AlertProps['severity']) => void;
}

const SnackbarContext = createContext<SnackbarContextInterface>({
    openSnackbar: () => {},
});

export default SnackbarContext;
