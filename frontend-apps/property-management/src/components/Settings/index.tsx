import { Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import AppContext from '../../store/app.context';
import SnackbarContext from '../../store/snackbar/snackbar.context';
import { updateSelf } from '../../api';

const Settings = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const { setUser, user } = useContext(AppContext);
    const { openSnackbar } = useContext(SnackbarContext);

    const isFirstNameValid = firstName.length > 0 && firstName.length <= 50 && /^[\p{L}]+$/u.test(firstName);
    const isLastNameValid = lastName.length > 0 && lastName.length <= 50 && /^[\p{L}]+$/u.test(lastName);
    const isPasswordValid = password.length >= 6 && password.length <= 50;
    const isFormValid: boolean = isFirstNameValid && isLastNameValid && (!checkPassword || isPasswordValid);

    const handleSaveClick = async () => {
        if (!user) {
            return;
        }

        if (isFormValid) {
            try {
                setIsSaving(true);
                const payload = {
                    firstName,
                    lastName,
                    email,
                    ...(checkPassword && { password }),
                };
                const newUser = await updateSelf(payload);
                setUser(newUser);

                openSnackbar('Settings updated successfully', 'success');
                setCheckPassword(false);
                setPassword('');
            } catch (error) {
                console.error('Update failed:', error);
                openSnackbar(
                    isAxiosError(error) ? error?.response?.data.message : 'Update failed. Please try again.',
                    'error'
                );
            } finally {
                setIsSaving(false);
            }
        }
    };

    const isSaveButtonDisabled = isSaving || !isFormValid;

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
        }
    }, [user]);

    return (
        <Paper sx={{ width: 'min(100%, 600px)', mx: 'auto', p: 2 }}>
            <Typography variant="h4">Settings</Typography>
            <Box component="hr" sx={{ my: 2 }} />
            <Grid container spacing={2}>
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
                    value={email}
                    disabled
                    slotProps={{
                        htmlInput: {
                            readOnly: true,
                        },
                    }}
                />
                <FormControlLabel
                    control={<Checkbox checked={checkPassword} onChange={(e) => setCheckPassword(e.target.checked)} />}
                    label="Change Password"
                    sx={{ width: '100%' }}
                />
                {checkPassword && (
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
                )}
                <Button variant="contained" disabled={isSaveButtonDisabled} onClick={handleSaveClick}>
                    Save
                </Button>
            </Grid>
        </Paper>
    );
};

export default Settings;
