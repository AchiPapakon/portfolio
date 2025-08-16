import { Box, styled } from '@mui/material';
import { useContext } from 'react';
import { TicTacToeContext } from './TicTacToeContext';

const StyledBox = styled(Box)(() => ({
    width: 130,
    height: 130,
    backgroundColor: 'gray',
    fontSize: '70px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
}));

interface TileTicTacToeProps {
    children: React.ReactNode;
    onClick: () => void;
}

const TileTicTacToe = ({ children, onClick }: TileTicTacToeProps) => {
    const { isPlaying } = useContext(TicTacToeContext);

    return (
        <StyledBox
            sx={{
                backgroundColor: isPlaying ? 'lightgray' : 'gray',
                cursor: isPlaying ? 'pointer' : 'initial',
            }}
            onClick={onClick}
        >
            {children}
        </StyledBox>
    );
};

export default TileTicTacToe;
