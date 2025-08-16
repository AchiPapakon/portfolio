import { createContext } from 'react';

export interface TicTacToeContextInterface {
    isPlaying: boolean;
}

export const TicTacToeContext = createContext<TicTacToeContextInterface>({
    isPlaying: false,
});
