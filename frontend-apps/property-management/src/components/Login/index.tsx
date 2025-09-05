import { Alert, Box, Button, Grid, Paper, Snackbar, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../../api';
import AppContext from '../../store/app.context';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openToast, setOpenToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const { setIsAuthenticated, setUser } = useContext(AppContext);
    const navigate = useNavigate();

    const isEmailValid = email.length > 0 && email.length <= 100 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password.length >= 6 && password.length <= 50;
    const isFormValid: boolean = isEmailValid && isPasswordValid;

    const handleLoginClick = async () => {
        if (isFormValid) {
            try {
                setIsLoggingIn(true);
                const user = await login(email, password);
                setIsAuthenticated(true);
                setUser(user);

                navigate('/');
            } catch (error) {
                console.error('Login failed:', error);
                setErrorMessage(error instanceof Error ? error.message : 'Login failed. Please try again.');
                setOpenToast(true);
            } finally {
                setIsLoggingIn(false);
            }
        }
    };

    const handleCloseToast = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenToast(false);
    };

    const isLoginButtonDisabled = isLoggingIn || !isFormValid;

    return (
        <Paper sx={{ width: 'min(100%, 600px)', mx: 'auto', p: 2 }}>
            <Typography variant="h4">Login</Typography>
            <Box component="hr" sx={{ my: 2 }} />
            <Grid container spacing={2}>
                <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    slotProps={{
                        htmlInput: {
                            maxLength: 100,
                        },
                    }}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    slotProps={{
                        htmlInput: {
                            maxLength: 50,
                        },
                    }}
                />
                <Button variant="contained" disabled={isLoginButtonDisabled} onClick={handleLoginClick}>
                    Login
                </Button>
            </Grid>

            <Snackbar open={openToast} autoHideDuration={4000} onClose={handleCloseToast}>
                <Alert onClose={handleCloseToast} severity="error" variant="filled" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default Login;
