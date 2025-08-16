import type { Cell, tttSymbol } from './types';

export const isBoardFull = (board: Cell[][]): boolean => {
    return board.every((row) => row.every((cell) => cell !== ''));
};

export const checkWinner = (board: Cell[][]): Cell | null => {
    // Rows, columns, diagonals
    for (let i = 0; i < 3; i += 1) {
        if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return board[i][0];
        if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) return board[0][i];
    }
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return board[0][0];
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return board[0][2];
    return null;
};

const minimax = (board: Cell[][], cpuSymbol: tttSymbol, depth: number, isMaximizing: boolean): number => {
    const humanSymbol: tttSymbol = cpuSymbol === 'X' ? 'O' : 'X';

    const winner = checkWinner(board);
    if (winner === cpuSymbol) return 10 - depth;
    if (winner === humanSymbol) return depth - 10;
    if (isBoardFull(board)) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let row = 0; row < 3; row += 1) {
            for (let col = 0; col < 3; col += 1) {
                if (board[row][col] === '') {
                    const newBoard = board.map((r) => [...r]);
                    newBoard[row][col] = cpuSymbol;
                    const score = minimax(newBoard, cpuSymbol, depth + 1, false);
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    }
    let bestScore = Infinity;
    for (let row = 0; row < 3; row += 1) {
        for (let col = 0; col < 3; col += 1) {
            if (board[row][col] === '') {
                const newBoard = board.map((r) => [...r]);
                newBoard[row][col] = humanSymbol;
                const score = minimax(newBoard, cpuSymbol, depth + 1, true);
                bestScore = Math.min(score, bestScore);
            }
        }
    }
    return bestScore;
};

// To get the best move for CPU (cpuSymbol):
const getBestMove = (board: Cell[][], cpuSymbol: tttSymbol): [number, number] | null => {
    let bestScore = -Infinity;
    let move: [number, number] | null = null;
    for (let row = 0; row < 3; row += 1) {
        for (let col = 0; col < 3; col += 1) {
            if (board[row][col] === '') {
                const newBoard = board.map((r) => [...r]);
                newBoard[row][col] = cpuSymbol;
                const score = minimax(newBoard, cpuSymbol, 0, false);
                if (score > bestScore) {
                    bestScore = score;
                    move = [row, col];
                }
            }
        }
    }
    return move;
};

export default getBestMove;
