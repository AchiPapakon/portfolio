import { Autocomplete, Box, Button, Grid, Paper, Snackbar, Alert, Slide, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import type { StationDeparture, StationDepartures } from 'types/gateway';
import type { ListSuggestion } from 'types/ListSuggestion';
import { translate } from './helpers/translation';
import { useDispatch, useSelector } from './redux/hooks';
import {
    getNearestStations,
    getStationDepartures,
    getStations,
    resetStations,
    setNearbyStationError,
} from './redux/stations/reducer';
import {
    selectedStationSelector,
    stationDetailsFetchingSelector,
    stationDetailsObjectSelector,
    stationsSuggestionsListSelector,
} from './redux/stations/selectors';
import LightIndicator from './components/LightIndicator';
import getTimeDiff from './helpers/getTimeDiff';
import { websocketsIsOpenSelector } from './redux/websocket/selectors';
import Results from './components/Results';
import Background from './components/styled/Background';

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}

const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 5_000,
};

function error() {
    // eslint-disable-next-line no-alert
    alert('Sorry, no position available.');
}

const App = () => {
    const dispatch = useDispatch();
    const [currentTime, setCurrentTime] = useState(Date.now());

    const stationsSuggestions = useSelector(stationsSuggestionsListSelector);
    const isOpen = useSelector(websocketsIsOpenSelector);
    const stationDetails = useSelector(stationDetailsObjectSelector);
    const stationDetailsFetching = useSelector(stationDetailsFetchingSelector);
    const selectedStation = useSelector(selectedStationSelector);
    const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null | undefined>(
        undefined
    );

    const timer = useRef<NodeJS.Timeout>(undefined);

    const handleAutocompleteSelect = (_: React.SyntheticEvent<Element, Event>, value: ListSuggestion | null) => {
        if (value) {
            dispatch(setNearbyStationError(false));
            dispatch(getStationDepartures(value));
        }
    };

    const handleFeelLuckyClick = () => {
        const success = ({ coords }: GeolocationPosition) => {
            dispatch(getNearestStations({ lat: coords.latitude, lon: coords.longitude }));
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
    };

    useEffect(() => {
        timer.current = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1_000);
    }, []);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            setInstallPromptEvent(e as BeforeInstallPromptEvent);
        };

        if (installPromptEvent === undefined) {
            window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        }

        return () => {
            clearInterval(timer.current);
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, [installPromptEvent]);

    const handleCloseBanner = () => {
        setInstallPromptEvent(null);
    };

    const setUserDisagree = () => {
        localStorage.setItem('schedules-dismissedInstall', JSON.stringify(Date.now() + 5 * 60 * 1000));
        handleCloseBanner();
    };

    const handleInstallClick = async () => {
        if (installPromptEvent) {
            await installPromptEvent.prompt();
            const { outcome } = await installPromptEvent.userChoice;

            if (outcome === 'dismissed') {
                setUserDisagree();
            } else {
                handleCloseBanner();
            }
        }
    };

    const shouldAskUserToInstall =
        Date.now() > (JSON.parse(localStorage.getItem('schedules-dismissedInstall') || '0') || 0) &&
        Boolean(installPromptEvent);

    return (
        <Background>
            <div style={{ display: 'grid', gap: '8px' }}>
                <LightIndicator on={isOpen} />
                <Autocomplete
                    disablePortal
                    options={stationsSuggestions}
                    getOptionKey={(option) => option.id}
                    disabled={stationDetailsFetching}
                    sx={{ width: 300 }}
                    value={selectedStation}
                    onChange={handleAutocompleteSelect}
                    onInputChange={(_, value: string) => {
                        if (!value) {
                            dispatch(resetStations());
                        }
                        if (value.length > 2) {
                            dispatch(getStations(value));
                        }
                    }}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    renderInput={(params) => <TextField {...params} label={translate('station')} />}
                />
                <div>
                    <Button variant="contained" disabled={stationDetailsFetching} onClick={handleFeelLuckyClick}>
                        {translate('iFeelLucky')}
                    </Button>
                </div>
                <Grid container spacing={1}>
                    <Results
                        fetching={stationDetailsFetching}
                        hasSelectedStation={Boolean(selectedStation)}
                        hasStationDetails={Object.entries(stationDetails).length > 0}
                    />
                    {!stationDetailsFetching &&
                        Object.entries(stationDetails).length > 0 &&
                        Object.entries(stationDetails).map(
                            ([title, stationDepartures]: [string, StationDepartures]) => (
                                <Paper key={title}>
                                    <Background>
                                        <Typography>[{title}]</Typography>
                                        <Grid container spacing={1} direction="column">
                                            {Object.entries(stationDepartures).map(
                                                ([directionId, directionDepartures]: [string, StationDeparture[]]) => (
                                                    <Box key={directionId}>
                                                        <Typography>[{directionId}]</Typography>
                                                        {directionDepartures.map((departure) => (
                                                            <Typography
                                                                key={departure.key}
                                                                sx={{
                                                                    color: departure.isRealTime ? 'green' : 'orange',
                                                                }}
                                                            >
                                                                {getTimeDiff(departure.dateTime, currentTime)} (
                                                                {new Date(departure.dateTime).toLocaleTimeString()}){' '}
                                                                {departure.lineNumber} | {departure.destinationName}
                                                            </Typography>
                                                        ))}
                                                    </Box>
                                                )
                                            )}
                                        </Grid>
                                    </Background>
                                </Paper>
                            )
                        )}
                </Grid>
            </div>
            <Snackbar
                open={shouldAskUserToInstall}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                slots={{ transition: Slide }}
            >
                <Alert
                    severity="info"
                    icon={false}
                    variant="filled"
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                    action={
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button size="small" color="inherit" onClick={setUserDisagree}>
                                {translate('later') || 'Later'}
                            </Button>
                            <Button size="small" variant="contained" onClick={handleInstallClick}>
                                {translate('install') || 'Install'}
                            </Button>
                        </Box>
                    }
                >
                    {translate('installPrompt') || 'Install this app on your device for quick access'}
                </Alert>
            </Snackbar>
        </Background>
    );
};

export default App;
