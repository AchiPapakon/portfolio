import { Box } from '@mui/material';
import { useContext } from 'react';
import DigitalNumber from './DigitalNumber';
import { GameContext } from './controller';

const DigitalScreen = ({ number = 0 }: { number?: number }) => {
    const leftNumber = number ? Math.floor(number / 10) || null : null;
    const rightNumber = number === null ? null : number % 10;

    const { isOngoing } = useContext(GameContext);

    return (
        <Box
            sx={{
                width: '63px',
                height: '60px',
                '>div:first-child': {
                    marginLeft: 0,
                },
                '>div': {
                    marginLeft: '33px',
                },
            }}
        >
            <DigitalNumber number={isOngoing ? leftNumber : null} />
            <DigitalNumber number={isOngoing ? rightNumber : null} />
        </Box>
    );
};

export default DigitalScreen;
