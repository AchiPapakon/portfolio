import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import type { LocalWeatherResponse } from 'types/localWeather';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import { dancingScript } from '../../css/generic';
import Content from './Content';

const options = {
    enableHighAccuracy: false,
    maximumAge: 0,
    timeout: 30_000,
};

const LocalWeather = () => {
    const [info, setInfo] = useState<LocalWeatherResponse>({
        name: '',
        country: '',
        img: '',
        description: '',
        degrees: 0,
        humidity: 0,
        wind: 0,
        lastUpdate: Date.now(),
        sunrise: 0,
        sunset: 0,
        backgroundColor: 'black',
    });
    const [error, setError] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const handleSuccess = async ({ coords }: GeolocationPosition) => {
            setIsFetching(true);

            const response: Response = await fetch(
                `${import.meta.env.VITE_REMOTE_HOST}/api/local-weather?lat=${coords.latitude}&lon=${coords.longitude}`
            );

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}. Response: ${JSON.stringify(response)}`);
            }

            const json: LocalWeatherResponse = await response.json();

            setInfo(json);

            setError('');
            setIsFetching(false);
        };

        const handleError = ({ code }: GeolocationPositionError) => {
            if (code === 1) {
                setError('Geolocation permission denied.');
            } else {
                setError('No position available');
            }
        };

        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            if (result.state === 'denied') {
                setError('Geolocation permission denied.');
            } else if (result.state === 'prompt') {
                setError('Please allow geolocation...');
            }
        });

        navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
    }, []);

    return (
        <Box sx={{ backgroundColor: info.backgroundColor, display: 'grid', flex: 1, justifyItems: 'center' }}>
            <Stack spacing={1} sx={{ mt: 1 }}>
                <Paper sx={{ maxWidth: 500, p: 1 }}>
                    <Typography textAlign="center" variant="h2" fontFamily={dancingScript}>
                        Local Weather
                    </Typography>
                    <Typography textAlign="center">
                        The background changes color depending on the hour of the day.
                    </Typography>
                </Paper>
                <Paper sx={{ maxWidth: 500, p: 2 }}>
                    <Content error={error} isFetching={isFetching}>
                        <Stack gap={3}>
                            <Typography variant="h4" textAlign="center">
                                {info.name}, {info.country}
                            </Typography>
                            <Grid container>
                                <Grid size={5} textAlign="center">
                                    <Typography>{info.degrees} °C</Typography>
                                    <Box component="img" src={info.img} title={info.description} />
                                    <Typography>{info.description}</Typography>
                                </Grid>
                                <Grid size={2} />
                                <Grid size={5}>
                                    <Stack gap={1}>
                                        <Grid container spacing={1}>
                                            <WaterDropIcon sx={{ color: '#1CA3EC' }} />
                                            <Typography>{info.humidity} %</Typography>
                                        </Grid>
                                        <Grid container spacing={1}>
                                            <AirIcon sx={{ color: 'gray' }} />
                                            <Typography>{info.wind} km/h</Typography>
                                        </Grid>
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Typography variant="caption">
                                Last update: {new Date(info.lastUpdate).toLocaleString()}
                            </Typography>
                        </Stack>
                    </Content>
                </Paper>
            </Stack>
        </Box>
    );
};

export default LocalWeather;
