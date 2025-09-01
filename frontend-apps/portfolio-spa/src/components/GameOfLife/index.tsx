import { useEffect, useRef, useState } from 'react';
import { Box, Button, Grid, Stack, styled, Typography } from '@mui/material';
import ShowcaseContainer from '../ShowcaseContainer';
import { dancingScript } from '../../css/generic';

const StyledButton = styled(Button)(({ theme }) => ({
    '&:disabled': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
    },
}));

type Cell = boolean;

const getBackgroundColor = (cell: Cell) => {
    return cell ? 'red' : 'transparent';
};

const countNeighbors = (board: Cell[][], x: number, y: number): number => {
    let count = 0;

    for (let i = -1; i < 2; i += 1) {
        for (let j = -1; j < 2; j += 1) {
            if ((i !== 0 || j !== 0) && board[x + i]?.[y + j]) {
                count += 1;
            }
        }
    }

    return count;
};

const emptyBoard = Array.from({ length: 50 }, () => Array(50).fill(false));

const GameOfLife = () => {
    const [board, setBoard] = useState<Cell[][]>(emptyBoard);
    const [generations, setGenerations] = useState(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const isEmptyBoard = board.every((row) => row.every((cell) => !cell));

    const randomizeBoard = () => {
        const newBoard = Array.from({ length: 50 }, () => Array.from({ length: 50 }, () => Math.random() > 0.7));
        setBoard(newBoard);
    };

    const play = () => {
        setIsPlaying(true);
    };

    const pause = () => {
        setIsPlaying(false);
    };

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setBoard((prevBoard) => {
                    const newBoard = prevBoard.map((row) => [...row]);
                    // Apply the Game of Life rules
                    for (let i = 0; i < newBoard.length; i += 1) {
                        for (let j = 0; j < newBoard[i].length; j += 1) {
                            const neighbors = countNeighbors(prevBoard, i, j);
                            if (prevBoard[i][j] && (neighbors < 2 || neighbors > 3)) {
                                newBoard[i][j] = false;
                            } else if (!prevBoard[i][j] && neighbors === 3) {
                                newBoard[i][j] = true;
                            }
                        }
                    }

                    if (newBoard.every((row) => row.every((cell) => !cell))) {
                        pause();
                    }

                    return newBoard;
                });
                setGenerations((prev) => prev + 1);
            }, 100);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPlaying]);

    useEffect(() => {
        randomizeBoard();
        play();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const handleClick = (rowIndex: number, colIndex: number) => () => {
        setBoard((prevBoard) => {
            const newBoard = prevBoard.map((row) => [...row]);
            newBoard[rowIndex][colIndex] = !newBoard[rowIndex][colIndex];
            return newBoard;
        });
    };

    const handleClearBoard = () => {
        setBoard(emptyBoard);
        setGenerations(0);
        setIsPlaying(false);
    };

    return (
        <ShowcaseContainer sx={{ backgroundColor: 'black' }}>
            <Stack spacing={1} sx={{ mt: 1, alignItems: 'center', width: 'min(100%, 502px)' }}>
                <Typography textAlign="center" variant="h2" color="secondary" fontFamily={dancingScript}>
                    Game of Life
                </Typography>
                <Typography textAlign="center" variant="h5" color="secondary">
                    You can add or remove cells while running the simulation
                </Typography>
                <Box sx={{ border: '1px solid', borderColor: 'primary.main' }}>
                    {board.map((row, rowIndex) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Grid container key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <Box
                                    // eslint-disable-next-line react/no-array-index-key
                                    key={colIndex}
                                    sx={{
                                        borderRight: colIndex < row.length - 1 ? '1px solid' : 'none',
                                        borderBottom: rowIndex < board.length - 1 ? '1px solid' : 'none',
                                        borderColor: 'primary.main',
                                        width: 10,
                                        height: 10,
                                        backgroundColor: getBackgroundColor(cell),
                                    }}
                                    onClick={handleClick(rowIndex, colIndex)}
                                />
                            ))}
                        </Grid>
                    ))}
                </Box>
                <Grid container justifyContent="space-between" sx={{ width: 502 }}>
                    <StyledButton variant="contained" onClick={isPlaying ? pause : play} disabled={isEmptyBoard}>
                        {isPlaying ? 'Pause' : 'Play'}
                    </StyledButton>
                    <StyledButton variant="contained" onClick={handleClearBoard} disabled={isEmptyBoard}>
                        Clear
                    </StyledButton>
                    <StyledButton variant="contained" onClick={() => randomizeBoard()}>
                        Randomize
                    </StyledButton>
                </Grid>
                <Typography color="secondary">Generations: {generations}</Typography>
            </Stack>
        </ShowcaseContainer>
    );
};

export default GameOfLife;
