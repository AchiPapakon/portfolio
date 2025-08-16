import { Button, Dialog, DialogContent, DialogTitle, Grid, Paper, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import ShowcaseContainer from '../ShowcaseContainer';
import { dancingScript } from '../../css/generic';
import TileTicTacToe from './TileTicTacToe';
import type { Cell, tttSymbol } from './types';
import getBestMove, { checkWinner, isBoardFull } from './minimax';
import { TicTacToeContext } from './TicTacToeContext';

const getNewBoard = (targetBoard: Cell[][], targetRow: number, targetCol: number, newValue: Cell) => {
    const newBoard = targetBoard.map((row, rowIdx) =>
        rowIdx === targetRow ? row.map((cell, colIdx) => (colIdx === targetCol ? newValue : cell)) : row
    );

    return newBoard;
};

const INITIAL_BOARD: Cell[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];

const TicTacToe = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
    const [humanSymbol, setHumanSymbol] = useState<'X' | 'O'>('X');
    const [winner, setWinner] = useState<Cell>('');
    const [full, setFull] = useState<boolean>(false);
    const [board, setBoard] = useState<Cell[][]>(INITIAL_BOARD);

    const cpuSymbol: tttSymbol = humanSymbol === 'X' ? 'O' : 'X';

    const mark = (humanRow: number, humanCol: number) => {
        if (board[humanRow][humanCol] || winner || full || !isPlaying) {
            return;
        }

        // Human
        let newBoard = getNewBoard(board, humanRow, humanCol, humanSymbol);

        let newWinner = checkWinner(newBoard);
        if (newWinner) {
            setWinner(newWinner);
            setBoard(newBoard);
            setIsPlaying(false);
            alert(`winner: ${newWinner}`);
            return;
        }

        if (isBoardFull(newBoard)) {
            setBoard(newBoard);
            setFull(true);
            setIsPlaying(false);
            alert('Tie!');
            return;
        }

        // CPU
        const bestMove = getBestMove(newBoard, cpuSymbol);
        if (bestMove) {
            const [cpuRow, cpuCol] = bestMove;
            newBoard = getNewBoard(newBoard, cpuRow, cpuCol, cpuSymbol);
        }

        setBoard(newBoard);

        newWinner = checkWinner(newBoard);
        if (newWinner) {
            setWinner(newWinner);
            setIsPlaying(false);
            alert(`winner: ${newWinner}`);
        }

        if (isBoardFull(newBoard)) {
            setIsPlaying(false);
            alert('Tie!');
            setFull(true);
        }
    };

    const clearBoard = () => setBoard(INITIAL_BOARD);

    const resetGame = (symbol: tttSymbol) => {
        setPopupOpen(false);
        setIsPlaying(true);
        setHumanSymbol(symbol);
        clearBoard();
        setFull(false);
        setWinner('');
    };

    const ticTacToeContextValue = useMemo(() => ({ isPlaying }), [isPlaying]);

    return (
        <ShowcaseContainer sx={{ backgroundColor: 'black' }}>
            <Stack spacing={1} sx={{ mt: 1 }}>
                <Typography textAlign="center" variant="h2" fontFamily={dancingScript} color="secondary">
                    Tic Tac Toe
                </Typography>
                <Stack spacing="2px" sx={{ backgroundColor: 'green' }}>
                    <TicTacToeContext value={ticTacToeContextValue}>
                        <Grid container spacing="2px" sx={{ backgroundColor: 'green' }}>
                            <TileTicTacToe onClick={() => mark(0, 0)}>{board[0][0]}</TileTicTacToe>
                            <TileTicTacToe onClick={() => mark(0, 1)}>{board[0][1]}</TileTicTacToe>
                            <TileTicTacToe onClick={() => mark(0, 2)}>{board[0][2]}</TileTicTacToe>
                        </Grid>
                        <Grid container spacing="2px" sx={{ backgroundColor: 'green' }}>
                            <TileTicTacToe onClick={() => mark(1, 0)}>{board[1][0]}</TileTicTacToe>
                            <TileTicTacToe onClick={() => mark(1, 1)}>{board[1][1]}</TileTicTacToe>
                            <TileTicTacToe onClick={() => mark(1, 2)}>{board[1][2]}</TileTicTacToe>
                        </Grid>
                        <Grid container spacing="2px" sx={{ backgroundColor: 'green' }}>
                            <TileTicTacToe onClick={() => mark(2, 0)}>{board[2][0]}</TileTicTacToe>
                            <TileTicTacToe onClick={() => mark(2, 1)}>{board[2][1]}</TileTicTacToe>
                            <TileTicTacToe onClick={() => mark(2, 2)}>{board[2][2]}</TileTicTacToe>
                        </Grid>
                    </TicTacToeContext>
                </Stack>
                {isPlaying && (
                    <Paper sx={{ p: 1, textAlign: 'center', backgroundColor: 'lightgray' }}>
                        <Typography>You&apos;re playing as {humanSymbol}</Typography>
                    </Paper>
                )}
                {!isPlaying && (
                    <Button variant="contained" color="secondary" onClick={() => setPopupOpen(true)}>
                        Play!
                    </Button>
                )}
            </Stack>
            <Dialog open={isPopupOpen}>
                <DialogTitle>Choose a symbol</DialogTitle>
                <DialogContent>
                    <Grid container spacing={1} justifyContent="space-between">
                        <Button variant="contained" color="secondary" onClick={() => resetGame('X')}>
                            X
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => resetGame('O')}>
                            O
                        </Button>
                    </Grid>
                </DialogContent>
            </Dialog>
        </ShowcaseContainer>
    );
};

export default TicTacToe;
