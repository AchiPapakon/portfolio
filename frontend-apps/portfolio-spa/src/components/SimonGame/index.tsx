import { useEffect, useMemo, useState } from 'react';
import { Grid, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { dancingScript } from '../../css/generic';
import ShowcaseContainer from '../ShowcaseContainer';
import DigitalScreen from './DigitalScreen';
import { Game, GameContext } from './controller';
import { CrystalColor } from './types';
import Crystal from './Crystal';

type BoardState = 'off' | 'on' | 'strict';

const BoardState = {
    Off: 'off' as BoardState,
    On: 'on' as BoardState,
    Strict: 'strict' as BoardState,
};

const SimonGame = () => {
    const [boardState, setBoardState] = useState<BoardState>(BoardState.Off);
    const [game, setGame] = useState<Game>({} as Game);

    const updateGame = (newGame: Game) => {
        setGame(newGame);
    };

    useEffect(() => {
        setGame(new Game(updateGame));
    }, []);

    const handleBoardStateChange = (_: React.MouseEvent<HTMLElement>, value: BoardState) => {
        if (value) {
            setBoardState(value);
        }

        if (value === BoardState.On) {
            game.start();
        } else if (value === BoardState.Strict) {
            game.startStrict();
        } else if (value === BoardState.Off) {
            game.stop();
        }
    };

    const isOngoing = [BoardState.On, BoardState.Strict].includes(boardState);

    const gameContextValue = useMemo(() => ({ isOngoing }), [isOngoing]);

    return (
        <ShowcaseContainer sx={{ backgroundColor: 'black' }}>
            <Stack spacing={1} sx={{ mt: 1, width: '100%', alignItems: 'center' }}>
                <Typography textAlign="center" variant="h2" color="secondary" fontFamily={dancingScript}>
                    Simon Game
                </Typography>
                <Paper sx={{ p: 2, width: 'min(100%, 535px)' }}>
                    <GameContext.Provider value={gameContextValue}>
                        <Paper sx={{ height: 370 }}>
                            <Grid
                                container
                                sx={{
                                    backgroundColor: 'mediumpurple',
                                    height: 270,
                                    justifyContent: 'space-evenly',
                                    div: { mt: 2 },
                                    'div:first-child, div:last-child': { mt: 6 },
                                }}
                            >
                                <Crystal game={game} color={CrystalColor.Blue} />
                                <Crystal game={game} color={CrystalColor.Red} />
                                <Crystal game={game} color={CrystalColor.Green} />
                                <Crystal game={game} color={CrystalColor.Yellow} />
                            </Grid>
                            <Grid
                                container
                                sx={{
                                    backgroundColor: 'pink',
                                    height: 100,
                                    p: 1,
                                    gap: 1,
                                    justifyContent: 'space-between',
                                    alignContent: 'center',
                                }}
                            >
                                <DigitalScreen number={game.series?.length} />
                                <ToggleButtonGroup
                                    value={boardState}
                                    exclusive
                                    onChange={handleBoardStateChange}
                                    size="small"
                                    sx={{
                                        alignItems: 'center',
                                        '>.MuiToggleButtonGroup-grouped': {
                                            backgroundColor: '#444',
                                            color: 'secondary.main',
                                            '&:hover': {
                                                backgroundColor: '#333',
                                            },
                                            '&.Mui-selected': {
                                                backgroundColor: '#111',
                                                color: 'secondary.main',
                                                '&:hover': {
                                                    backgroundColor: '#222',
                                                },
                                            },
                                        },
                                    }}
                                >
                                    <ToggleButton value={BoardState.Off}>Off</ToggleButton>
                                    <ToggleButton value={BoardState.On}>On</ToggleButton>
                                    <ToggleButton value={BoardState.Strict}>Strict</ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                        </Paper>
                    </GameContext.Provider>
                </Paper>
            </Stack>
        </ShowcaseContainer>
    );
};

export default SimonGame;
