import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { getApartments } from '../../api';
import AppContext from '../../store/app.context';

const ApartmentsList = () => {
    const { apartments, setApartments } = useContext(AppContext);

    useEffect(() => {
        const fetchApartments = async () => {
            const newApartments = await getApartments();
            setApartments(newApartments);
        };

        fetchApartments();
    }, [setApartments]);

    return (
        <Paper sx={{ width: 'min(100%, 600px)', mx: 'auto', p: 2 }}>
            <Typography variant="h4">Apartments List</Typography>
            <Box component="hr" sx={{ my: 2 }} />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>City</TableCell>
                        <TableCell>Street</TableCell>
                        <TableCell>Floor</TableCell>
                        <TableCell>Surface (m²)</TableCell>
                        <TableCell>Energy Class</TableCell>
                        <TableCell>Owner</TableCell>
                        <TableCell>Tenant</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {apartments.map((apartment) => (
                        <TableRow key={apartment.id}>
                            <TableCell>{apartment.city}</TableCell>
                            <TableCell>{apartment.street}</TableCell>
                            <TableCell>{apartment.floor}</TableCell>
                            <TableCell>{apartment.surface}</TableCell>
                            <TableCell>{apartment.energyClass}</TableCell>
                            <TableCell>{apartment.owner}</TableCell>
                            <TableCell>{apartment.tenant}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default ApartmentsList;
