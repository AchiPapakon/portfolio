import { useEffect, useRef, useState } from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { dancingScript } from '../../css/generic';
import ShowcaseContainer from '../ShowcaseContainer';

type BoxColor = 'red' | 'green' | 'blue' | 'white';
type BoxState = 'hours' | 'minutes' | 'both' | 'none';

const gridTemplateAreas = `
"side_2 side_2 side_1a side_5 side_5 side_5 side_5 side_5"
"side_2 side_2 side_1b side_5 side_5 side_5 side_5 side_5"
"side_3 side_3 side_3 side_5 side_5 side_5 side_5 side_5"
"side_3 side_3 side_3 side_5 side_5 side_5 side_5 side_5"
"side_3 side_3 side_3 side_5 side_5 side_5 side_5 side_5"
`;

const getColor = (state: BoxState) => {
    if (state === 'hours') {
        return 'red';
    }

    if (state === 'minutes') {
        return 'green';
    }

    if (state === 'both') {
        return 'blue';
    }

    return 'white';
};

const FibonacciClock = () => {
    const [box1aColor, setBox1aColor] = useState<BoxColor>('white');
    const [box1bColor, setBox1bColor] = useState<BoxColor>('white');
    const [box2Color, setBox2Color] = useState<BoxColor>('white');
    const [box3Color, setBox3Color] = useState<BoxColor>('white');
    const [box5Color, setBox5Color] = useState<BoxColor>('white');

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const tick = () => {
        const date: Date = new Date();
        let hours: number = date.getHours();
        let minutes: number = date.getMinutes();

        let box5: BoxState = 'none';
        let box3: BoxState = 'none';
        let box2: BoxState = 'none';
        let box1a: BoxState = 'none';
        let box1b: BoxState = 'none';

        // Hours:
        if (hours > 12) {
            hours -= 12;
        }
        if (hours - 5 >= 0) {
            box5 = 'hours';
            hours -= 5;
        }
        if (hours - 3 >= 0) {
            box3 = 'hours';
            hours -= 3;
        }
        if (hours - 2 >= 0) {
            box2 = 'hours';
            hours -= 2;
        }
        if (hours - 1 >= 0) {
            box1a = 'hours';
            hours -= 1;
        }
        if (hours - 1 >= 0) {
            box1b = 'hours';
            hours -= 1;
        }

        // Minutes:
        minutes = Math.round(minutes / 5);
        if (minutes - 5 >= 0) {
            box5 = box5 === 'hours' ? 'both' : 'minutes';
            minutes -= 5;
        }
        if (minutes - 3 >= 0) {
            box3 = box3 === 'hours' ? 'both' : 'minutes';
            minutes -= 3;
        }
        if (minutes - 2 >= 0) {
            box2 = box2 === 'hours' ? 'both' : 'minutes';
            minutes -= 2;
        }
        if (minutes - 1 >= 0) {
            box1a = box1a === 'hours' ? 'both' : 'minutes';
            minutes -= 1;
        }
        if (minutes - 1 >= 0) {
            box1b = box1b === 'hours' ? 'both' : 'minutes';
            minutes -= 1;
        }

        // Change the state:
        setBox1aColor(getColor(box1a));
        setBox1bColor(getColor(box1b));
        setBox2Color(getColor(box2));
        setBox3Color(getColor(box3));
        setBox5Color(getColor(box5));
    };

    useEffect(() => {
        tick();

        timerRef.current = setInterval(() => {
            tick();
        }, 1_000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    return (
        <ShowcaseContainer sx={{ backgroundColor: 'black' }}>
            <Stack spacing={1} sx={{ mt: 1, alignItems: 'center', width: 'min(100%, 550px)' }}>
                <Typography textAlign="center" variant="h2" color="secondary" fontFamily={dancingScript}>
                    Fibonacci Clock
                </Typography>
                {/* width: 550px, height: 343px */}
                <Box
                    sx={{
                        display: 'grid',
                        gap: '3px',
                        gridTemplateAreas,
                        width: '100%',
                        aspectRatio: '1.6/1',
                    }}
                >
                    <Box sx={{ backgroundColor: box2Color, borderTopLeftRadius: '4px', gridArea: 'side_2' }} />
                    <Box sx={{ backgroundColor: box1aColor, gridArea: 'side_1a' }} />
                    <Box sx={{ backgroundColor: box1bColor, gridArea: 'side_1b' }} />
                    <Box sx={{ backgroundColor: box3Color, borderBottomLeftRadius: '4px', gridArea: 'side_3' }} />
                    <Box
                        sx={{
                            backgroundColor: box5Color,
                            borderTopRightRadius: '4px',
                            borderBottomRightRadius: '4px',
                            gridArea: 'side_5',
                        }}
                    />
                </Box>
                <Paper sx={{ p: 2, maxWidth: 550 }}>
                    Rectangle side=1: &nbsp;&nbsp;5mins | 1 hour
                    <br />
                    Rectangle side=2: 10mins | 2 hours
                    <br />
                    Rectangle side=3: 15mins | 3 hours
                    <br />
                    Rectangle side=5: 25mins | 5 hours
                    <br />
                    <br />
                    So, you just sum up the sides of the rectangles which are lighted up (Red for hours, Green for
                    Minutes and Blue for both).
                    <br />
                    <br />
                    For example, 9:55 would be 5+3+1 hours and (5+3+2+1)*5 mins.
                </Paper>
            </Stack>
        </ShowcaseContainer>
    );
};

export default FibonacciClock;
