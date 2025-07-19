import { Box, Grid, Stack, Typography } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useCallback, useEffect, useState } from 'react';
import ShowcaseContainer from '../ShowcaseContainer';
import { dancingScript } from '../../css/generic';
import ButtonCalc from './ButtonCalc';

const Calculator = () => {
    const [screen, setScreen] = useState<string>('0');

    const clear = () => setScreen('0');

    const handleClick = useCallback(
        (value: string) => () => {
            if (value === 'Backspace') {
                if (screen.length > 1) {
                    setScreen(screen.slice(0, -1));
                } else if (screen.length === 1) {
                    clear();
                }
                return;
            }

            if (value === 'Delete') {
                clear();
                return;
            }

            if (value === 'Enter') {
                if (screen.match(/\d$/)) {
                    // eslint-disable-next-line no-eval
                    setScreen(String(eval(String(screen))));
                }
                return;
            }

            if (screen === 'Infinity') {
                if (value.match(/[0-9]/)) {
                    setScreen(value);
                } else if (['Delete', 'Backspace'].includes(value)) {
                    clear();
                }
                return;
            }

            let newScreen = screen;

            // Is the screen clear? (only '0')
            if (screen === '0') {
                if (value.match(/[0-9]/)) {
                    newScreen = value;
                } else {
                    newScreen += value;
                }
            } else if (screen.length <= 17 * 2) {
                if (screen.match(/\d$/)) {
                    // If the last number has a comma
                    if (screen.match(/\d+\.\d*[+\-*/]?$/)) {
                        if (value.match(/[0-9+\-*/]/)) {
                            newScreen += value;
                        }
                    } else if (value.match(/[0-9+\-*/.]/)) {
                        newScreen += value;
                    }
                } else if (screen.match(/[+\-*/.]$/)) {
                    if (screen.match(/\d+\.\d*[+\-*/]?$/)) {
                        if (value.match(/[0-9]/)) {
                            newScreen += value;
                        } else if (value.match(/[0-9+\-*/]/)) {
                            newScreen = screen.slice(0, -1) + value;
                        }
                    } else if (value.match(/[0-9]/)) {
                        newScreen += value;
                    } else if (value.match(/[0-9+\-*./]/)) {
                        newScreen = screen.slice(0, -1) + value;
                    }
                }
            }
            setScreen(newScreen);
        },
        [screen]
    );

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key.match(/[0-9+\-*.,/]|(Enter)|(Backspace)|(Delete)/)) {
                handleClick(event.key.replace(',', '.'))();
            }
        },
        [handleClick]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown, false);

        return () => {
            document.removeEventListener('keydown', handleKeyDown, false);
        };
    }, [handleKeyDown]);

    return (
        <ShowcaseContainer sx={{ backgroundColor: 'black' }}>
            <Box sx={{ mt: 1 }}>
                <Box sx={{ width: '350px', backgroundColor: 'saddlebrown', p: '10px 20px 20px' }}>
                    <Stack spacing={2}>
                        <Typography
                            variant="h2"
                            color="secondary"
                            fontFamily={dancingScript}
                            textAlign="center"
                            sx={{ textShadow: '2px 2px 2px #323232' }}
                        >
                            Calculator
                        </Typography>
                        <Box
                            sx={{
                                textAlign: 'right',
                                border: '1px solid black',
                                boxShadow: '2px 2px 2px #323232',
                                px: '5px',
                                wordWrap: 'break-word',
                                backgroundColor: '#aa5',
                                fontSize: '28px',
                            }}
                        >
                            {screen}
                        </Box>
                        <Grid container justifyContent="space-between">
                            <Stack spacing={0.5}>
                                <Grid container spacing={0.5}>
                                    <ButtonCalc onClick={handleClick('7')}>7</ButtonCalc>
                                    <ButtonCalc onClick={handleClick('8')}>8</ButtonCalc>
                                    <ButtonCalc onClick={handleClick('9')}>9</ButtonCalc>
                                </Grid>
                                <Grid container spacing={0.5}>
                                    <ButtonCalc onClick={handleClick('4')}>4</ButtonCalc>
                                    <ButtonCalc onClick={handleClick('5')}>5</ButtonCalc>
                                    <ButtonCalc onClick={handleClick('6')}>6</ButtonCalc>
                                </Grid>
                                <Grid container spacing={0.5}>
                                    <ButtonCalc onClick={handleClick('1')}>1</ButtonCalc>
                                    <ButtonCalc onClick={handleClick('2')}>2</ButtonCalc>
                                    <ButtonCalc onClick={handleClick('3')}>3</ButtonCalc>
                                </Grid>
                                <Grid container spacing={0.5}>
                                    <ButtonCalc onClick={handleClick('.')}>.</ButtonCalc>
                                    <ButtonCalc onClick={handleClick('0')}>0</ButtonCalc>
                                    <ButtonCalc onClick={handleClick('Enter')}>=</ButtonCalc>
                                </Grid>
                            </Stack>
                            <Stack spacing={0.5}>
                                <ButtonCalc onClick={handleClick('/')}>/</ButtonCalc>
                                <ButtonCalc onClick={handleClick('*')}>x</ButtonCalc>
                                <Grid container spacing={0.5}>
                                    <ButtonCalc onClick={handleClick('-')}>-</ButtonCalc>
                                    <ButtonCalc onClick={handleClick('Backspace')}>
                                        <BackspaceIcon />
                                    </ButtonCalc>
                                </Grid>
                                <Grid container spacing={0.5}>
                                    <ButtonCalc onClick={handleClick('+')}>+</ButtonCalc>
                                    <ButtonCalc onClick={handleClick('Delete')}>C</ButtonCalc>
                                </Grid>
                            </Stack>
                        </Grid>
                    </Stack>
                </Box>
            </Box>
        </ShowcaseContainer>
    );
};

export default Calculator;
