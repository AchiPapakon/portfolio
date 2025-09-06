import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { isAxiosError } from 'axios';
import { register } from '../../api';
import AppContext from '../../store/app.context';
import SnackbarContext from '../../store/snackbar/snackbar.context';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const { setIsAuthenticated, setUser } = useContext(AppContext);
    const { openSnackbar } = useContext(SnackbarContext);
    const navigate = useNavigate();

    const isFirstNameValid = firstName.length > 0 && firstName.length <= 50 && /^[\p{L}]+$/u.test(firstName);
    const isLastNameValid = lastName.length > 0 && lastName.length <= 50 && /^[\p{L}]+$/u.test(lastName);
    const isEmailValid = email.length > 0 && email.length <= 100 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password.length >= 6 && password.length <= 50;
    const isFormValid: boolean = isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid;

    const handleCreateAccountClick = async () => {
        if (isFormValid) {
            try {
                setIsRegistering(true);
                const user = await register(firstName, lastName, email, password);
                setIsAuthenticated(true);
                setUser(user);

                navigate('/');
            } catch (error) {
                console.error('Registration failed:', error);
                openSnackbar(
                    isAxiosError(error) ? error?.response?.data.message : 'Registration failed. Please try again.',
                    'error'
                );
            } finally {
                setIsRegistering(false);
            }
        }
    };

    const isRegisterButtonDisabled = isRegistering || !isFormValid;

    return (
        <Paper sx={{ width: 'min(100%, 600px)', mx: 'auto', p: 2 }}>
            <Grid container spacing={2}>
                <Typography variant="h4">Register</Typography>
                <Box component="hr" width="100%" />
                <Grid size={5}>
                    <TextField
                        fullWidth
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        slotProps={{
                            htmlInput: {
                                maxLength: 50,
                            },
                        }}
                    />
                </Grid>
                <Grid size={7}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        slotProps={{
                            htmlInput: {
                                maxLength: 50,
                            },
                        }}
                    />
                </Grid>
                <TextField
                    fullWidth
                    label="Email"
                    helperText="We'll never share your email with anyone else"
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
                            maxLength: 100,
                        },
                    }}
                />
                <Button variant="contained" disabled={isRegisterButtonDisabled} onClick={handleCreateAccountClick}>
                    Create account
                </Button>
            </Grid>

            <Box component="hr" sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
                Already have an account? <Link to="/login">Login</Link>
            </Typography>
        </Paper>
    );
};

export default Register;
