import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { isAxiosError } from 'axios';
import { createApartment, deleteApartment, updateApartment } from '../../api';
import AppContext from '../../store/app.context';
import type { Apartment } from '../../types';
import SnackbarContext from '../../store/snackbar/snackbar.context';

interface EditApartmentPopupProps {
    mode: 'edit' | 'create';
    apartment?: Apartment;
}

const getStringOrNull = (value: string) => {
    const trimmedValue = value.trim();

    return trimmedValue === '' ? null : trimmedValue;
};

const getNumberOrNull = (value: string) => {
    const trimmedValue = value.trim();

    return trimmedValue === '' ? null : Number(trimmedValue);
};

const ModifyApartment = ({ mode, apartment }: EditApartmentPopupProps) => {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [floor, setFloor] = useState('');
    const [surface, setSurface] = useState('');
    const [energyClass, setEnergyClass] = useState('');
    const [owner, setOwner] = useState('');
    const [tenant, setTenant] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { setApartments } = useContext(AppContext);
    const { openSnackbar } = useContext(SnackbarContext);

    useEffect(() => {
        if (editDialogOpen && mode === 'edit' && apartment) {
            setCity(apartment.city ?? '');
            setStreet(apartment.street ?? '');
            setFloor(apartment.floor !== null ? String(apartment.floor) : '');
            setSurface(apartment.surface !== null ? String(apartment.surface) : '');
            setEnergyClass(apartment.energyClass ?? '');
            setOwner(apartment.owner ?? '');
            setTenant(apartment.tenant ?? '');
        }
    }, [apartment, editDialogOpen, mode]);

    const clearValues = () => {
        setCity('');
        setStreet('');
        setFloor('');
        setSurface('');
        setEnergyClass('');
        setOwner('');
        setTenant('');
    };

    const isChanged =
        mode === 'create' ||
        (apartment &&
            (apartment.city !== city.trim() ||
                apartment.street !== street.trim() ||
                apartment.floor !== getNumberOrNull(floor) ||
                apartment.surface !== getNumberOrNull(surface) ||
                apartment.energyClass !== getStringOrNull(energyClass) ||
                apartment.owner !== getStringOrNull(owner) ||
                apartment.tenant !== getStringOrNull(tenant)));

    const isSubmitDisabled = !city || !street || isSubmitting || !isChanged;

    const handleChangeFloor = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        // Allow only numbers from -1000 to 1000 or empty string
        if (value === '' || (/^-?\d{1,4}$/.test(value) && Number(value) >= -1000 && Number(value) <= 1000)) {
            setFloor(value);
        }
    };

    const handleChangeSurface = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        // Allow only positive numbers or empty string
        if (value === '' || (/^\d*\.?\d{0,5}$/.test(value) && Number(value) >= 0 && Number(value) <= 9_999_999)) {
            setSurface(value);
        }
    };

    const handleSubmitClick = async () => {
        const payload = {
            city: city.trim(),
            street: street.trim(),
            floor: getNumberOrNull(floor),
            surface: getNumberOrNull(surface),
            energyClass: getStringOrNull(energyClass),
            owner: getStringOrNull(owner),
            tenant: getStringOrNull(tenant),
        };

        setIsSubmitting(true);

        if (mode === 'edit') {
            try {
                if (!apartment) {
                    throw new Error('Apartment data is missing');
                }

                const updatedApartment: Apartment = await updateApartment(apartment.id, payload);
                setApartments((prevApartments: Apartment[]) =>
                    prevApartments.map((a) => (a.id === updatedApartment.id ? updatedApartment : a))
                );
                setEditDialogOpen(false);
            } catch (error) {
                console.error('Failed to update apartment:', error);
                openSnackbar(
                    isAxiosError(error) ? error?.response?.data.message : 'Failed to update apartment.',
                    'error'
                );
            } finally {
                setIsSubmitting(false);
            }
        } else {
            try {
                const createdApartment: Apartment = await createApartment(payload);
                setApartments((prevApartments: Apartment[]) => [...prevApartments, createdApartment]);

                setEditDialogOpen(false);

                openSnackbar('Apartment created successfully', 'success');
            } catch (error) {
                console.error('Failed to create apartment:', error);
                openSnackbar(
                    isAxiosError(error) ? error?.response?.data.message : 'Failed to create apartment.',
                    'error'
                );
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleDeleteApartment = async () => {
        setIsDeleting(true);
        try {
            if (!apartment) {
                throw new Error('Apartment data is missing');
            }

            await deleteApartment(apartment.id);
            setApartments((prevApartments) => prevApartments.filter((a) => a.id !== apartment.id));
            openSnackbar('Apartment deleted successfully', 'success');
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error('Failed to delete apartment:', error);
            openSnackbar(
                isAxiosError(error) ? error?.response?.data.message : 'Delete failed. Please try again.',
                'error'
            );
        } finally {
            setIsDeleting(false);
        }
    };

    const handleEditDialogClose = () => setEditDialogOpen(false);
    const handleDeleteDialogClose = () => setDeleteDialogOpen(false);

    return (
        <>
            {mode === 'edit' ? (
                <>
                    <IconButton color="error">
                        <DeleteIcon onClick={() => setDeleteDialogOpen(true)} />
                    </IconButton>
                    <IconButton onClick={() => setEditDialogOpen(true)}>
                        <EditIcon />
                    </IconButton>
                </>
            ) : (
                <Button variant="contained" onClick={() => setEditDialogOpen(true)}>
                    Add Apartment
                </Button>
            )}
            <Dialog open={editDialogOpen} onClose={handleEditDialogClose} onTransitionExited={clearValues}>
                <DialogTitle>{mode === 'edit' ? 'Edit Apartment' : 'Create Apartment'}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <TextField
                            label="City"
                            fullWidth
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            sx={{ mt: 1 }}
                            slotProps={{ htmlInput: { maxLength: 100 } }}
                        />
                        <TextField
                            label="Street"
                            fullWidth
                            required
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            slotProps={{ htmlInput: { maxLength: 100 } }}
                        />
                        <TextField label="Floor" fullWidth value={floor} onChange={handleChangeFloor} />
                        <TextField label="Surface (m²)" fullWidth value={surface} onChange={handleChangeSurface} />
                        <TextField
                            label="Energy Class"
                            fullWidth
                            value={energyClass}
                            onChange={(e) => setEnergyClass(e.target.value)}
                            slotProps={{ htmlInput: { maxLength: 10 } }}
                        />
                        <TextField
                            label="Owner"
                            fullWidth
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                            slotProps={{ htmlInput: { maxLength: 100 } }}
                        />
                        <TextField
                            label="Tenant"
                            fullWidth
                            value={tenant}
                            onChange={(e) => setTenant(e.target.value)}
                            slotProps={{ htmlInput: { maxLength: 100 } }}
                        />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleEditDialogClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSubmitClick} color="primary" disabled={isSubmitDisabled}>
                        {mode === 'edit' ? 'Save Changes' : 'Create Apartment'}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>Are you sure you want to delete this apartment?</DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleDeleteDialogClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleDeleteApartment} color="error" disabled={isDeleting}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ModifyApartment;
