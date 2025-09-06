import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { createApartment } from '../../api';
import AppContext from '../../store/app.context';
import type { Apartment } from '../../types';

interface EditApartmentPopupProps {
    mode: 'edit' | 'create';
}

const getStringOrNull = (value: string) => {
    const trimmedValue = value.trim();

    return trimmedValue === '' ? null : trimmedValue;
};

const getNumberOrNull = (value: string) => {
    const trimmedValue = value.trim();

    return trimmedValue === '' ? null : Number(trimmedValue);
};

const ModifyApartment = ({ mode }: EditApartmentPopupProps) => {
    const [open, setOpen] = useState(false);
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [floor, setFloor] = useState('');
    const [surface, setSurface] = useState('');
    const [energyClass, setEnergyClass] = useState('');
    const [owner, setOwner] = useState('');
    const [tenant, setTenant] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setApartments } = useContext(AppContext);

    const isSubmitDisabled = !city || !street || isSubmitting;

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

        if (mode === 'edit') {
            // Handle edit apartment logic
        } else {
            try {
                const createdApartment: Apartment = await createApartment(payload);
                setApartments((prevApartments: Apartment[]) => [...prevApartments, createdApartment]);

                setOpen(false);
            } catch (error) {
                console.error('Failed to create apartment:', error);
                // Handle error (e.g., show notification)
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleClose = () => setOpen(false);

    return (
        <>
            <Button variant="contained" onClick={() => setOpen(true)}>
                {mode === 'edit' ? 'Edit' : 'Add Apartment'}
            </Button>
            <Dialog open={open} onClose={handleClose}>
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
                    <Button variant="contained" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSubmitClick} color="primary" disabled={isSubmitDisabled}>
                        {mode === 'edit' ? 'Save Changes' : 'Create Apartment'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ModifyApartment;
