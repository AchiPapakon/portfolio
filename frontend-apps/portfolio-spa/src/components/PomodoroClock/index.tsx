import {
    Alert,
    Box,
    Button,
    FormControlLabel,
    Grid,
    LinearProgress,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ShowcaseContainer from '../ShowcaseContainer';
import { dancingScript } from '../../css/generic';
import ButtonPomodoro from './ButtonPomodoro';
import beepWav from './pomodoroBeep.wav';
import { getNewTime } from './helpers';
import Clock from './Clock';

const Beep = new Audio(beepWav);

type PomodoroMode = 'session' | 'break';

const DEFAULT_SESSION_TIME = '00:25:00';
const DEFAULT_BREAK_TIME = '00:05:00';

const zeroTimerWarning = "We can't start a zero session or break timer";

const PomodoroClock = () => {
    const [mode, setMode] = useState<PomodoroMode>('session');
    const [sessionTime, setSessionTime] = useState<string>(DEFAULT_SESSION_TIME);
    const [breakTime, setBreakTime] = useState<string>(DEFAULT_BREAK_TIME);
    const [currentSecond, setCurrentSecond] = useState<number>(0);
    const [totalSeconds, setTotalSeconds] = useState<number>(1);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

    const hasZeroTimer: boolean = [sessionTime, breakTime].includes('00:00:00');

    const handleTimeChange = (unit: 'hours' | 'minutes' | 'seconds', delta: number) => () => {
        const setTime = mode === 'session' ? setSessionTime : setBreakTime;

        setTime((oldTime) => {
            let [hours, minutes, seconds] = oldTime.split(':').map(Number);
            if (unit === 'hours') hours += delta;
            if (unit === 'minutes') minutes += delta;
            if (unit === 'seconds') seconds += delta;
            return getNewTime(hours, minutes, seconds);
        });
    };

    const progress = (currentSecond * 100) / totalSeconds;

    useEffect(() => {
        if (isPlaying) {
            if (progress === 0) {
                Beep.play();

                setTimeout(() => {
                    Beep.play();
                }, 500);
            }

            if (progress === 100) {
                Beep.play();
            }
        }
    }, [isPlaying, progress]);

    const handleStart = () => {
        if (isPlaying) {
            if (!isPaused) {
                clearInterval(timer.current);
                setIsPaused(true);
                return;
            }
            setIsPaused(false);
        }

        let modeVal: PomodoroMode = mode;
        let totalSecondsVal: number = totalSeconds;
        let currentSecondVal: number = currentSecond;
        let progressVal: number = progress;

        const handleTimer = () => {
            setIsPlaying(true);

            const time = modeVal === 'session' ? sessionTime : breakTime;
            let [hours, minutes, seconds] = time.split(':').map(Number);
            totalSecondsVal = hours * 3600 + minutes * 60 + seconds;

            progressVal = (currentSecondVal * 100) / totalSecondsVal;

            if (progressVal === 100) {
                modeVal = 'break';
                [hours, minutes, seconds] = breakTime.split(':').map(Number);
                totalSecondsVal = hours * 3600 + minutes * 60 + seconds;
                currentSecondVal = totalSecondsVal - 1;
            } else if (progressVal === 0) {
                modeVal = 'session';
                [hours, minutes, seconds] = sessionTime.split(':').map(Number);
                totalSecondsVal = hours * 3600 + minutes * 60 + seconds;
                currentSecondVal = 1;
            } else if (modeVal === 'session') {
                currentSecondVal += 1;
            } else {
                currentSecondVal -= 1;
            }

            setCurrentSecond(currentSecondVal);
            setMode(modeVal);
            setTotalSeconds(totalSecondsVal);
        };

        timer.current = setInterval(handleTimer, 1000);
    };

    return (
        <ShowcaseContainer sx={{ backgroundColor: 'black' }}>
            <Stack spacing={1} sx={{ mt: 1 }}>
                <Typography textAlign="center" variant="h2" color="secondary" fontFamily={dancingScript}>
                    Pomodoro Clock
                </Typography>
                <Paper sx={{ maxWidth: 535, p: 2 }}>
                    <Stack spacing={2}>
                        <Grid container sx={{ justifyContent: 'center' }} spacing={{ xs: 1, sm: 5 }}>
                            <Stack alignItems="center" spacing={0.5}>
                                <Grid container spacing={0.5}>
                                    <ButtonPomodoro disabled={isPlaying} onClick={handleTimeChange('hours', 1)}>
                                        +
                                    </ButtonPomodoro>
                                    <ButtonPomodoro disabled={isPlaying} onClick={handleTimeChange('minutes', 5)}>
                                        +
                                    </ButtonPomodoro>
                                    <ButtonPomodoro disabled={isPlaying} onClick={handleTimeChange('seconds', 5)}>
                                        +
                                    </ButtonPomodoro>
                                </Grid>
                                <Clock>{mode === 'session' ? sessionTime : breakTime}</Clock>
                                <Grid container spacing={0.5}>
                                    <ButtonPomodoro disabled={isPlaying} onClick={handleTimeChange('hours', -1)}>
                                        -
                                    </ButtonPomodoro>
                                    <ButtonPomodoro disabled={isPlaying} onClick={handleTimeChange('minutes', -5)}>
                                        -
                                    </ButtonPomodoro>
                                    <ButtonPomodoro disabled={isPlaying} onClick={handleTimeChange('seconds', -5)}>
                                        -
                                    </ButtonPomodoro>
                                </Grid>
                            </Stack>
                            <Stack justifyContent="space-evenly">
                                <RadioGroup
                                    value={mode}
                                    onChange={(e) => setMode(e.target.value as PomodoroMode)}
                                    name="mode-buttons-group"
                                >
                                    <FormControlLabel
                                        value="session"
                                        label="Session"
                                        disabled={isPlaying}
                                        control={<Radio sx={{ '&.MuiRadio-root': { py: 0.5 } }} />}
                                    />
                                    <FormControlLabel
                                        value="break"
                                        label="Break"
                                        disabled={isPlaying}
                                        control={<Radio sx={{ '&.MuiRadio-root': { py: 0.5 } }} />}
                                    />
                                </RadioGroup>
                                <Grid container spacing={0.5}>
                                    <Button
                                        variant="contained"
                                        disabled={hasZeroTimer}
                                        // eslint-disable-next-line no-nested-ternary
                                        color={isPlaying ? (isPaused ? 'info' : 'warning') : 'success'}
                                        onClick={handleStart}
                                        sx={{ minWidth: 90 }}
                                    >
                                        {/* eslint-disable-next-line no-nested-ternary */}
                                        {isPlaying ? (isPaused ? 'Resume' : 'Pause') : 'Begin'}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        disabled={hasZeroTimer}
                                        color="error"
                                        onClick={() => {
                                            setMode('session');
                                            setSessionTime(DEFAULT_SESSION_TIME);
                                            setBreakTime(DEFAULT_BREAK_TIME);
                                            setCurrentSecond(0);
                                            setIsPlaying(false);
                                            setIsPaused(false);
                                            clearInterval(timer.current);
                                        }}
                                    >
                                        Reset
                                    </Button>
                                </Grid>
                            </Stack>
                        </Grid>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress
                                color="success"
                                variant="determinate"
                                value={progress}
                                sx={{
                                    height: 17,
                                    borderRadius: '4px',
                                    '&.MuiLinearProgress-root': {
                                        backgroundColor: mode === 'session' ? 'secondary.main' : 'error.light',
                                    },
                                }}
                            />
                        </Box>
                        {hasZeroTimer && <Alert severity="error">{zeroTimerWarning}</Alert>}
                    </Stack>
                </Paper>
            </Stack>
        </ShowcaseContainer>
    );
};

export default PomodoroClock;
