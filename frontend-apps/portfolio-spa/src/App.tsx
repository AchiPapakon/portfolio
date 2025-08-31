import { AppBar, Box, Toolbar as MuiToolbar } from '@mui/material';
import { Route, Routes } from 'react-router';
import { Signature, Toolbar } from 'shared/components';
import type { NavItem } from 'shared/components/Toolbar/types';
import Showcase from './components/Showcase';
import Error404 from './components/Error404';
import LocalWeather from './components/LocalWeather';
import Calculator from './components/Calculator';
import PomodoroClock from './components/PomodoroClock';
import TicTacToe from './components/TicTacToe';
import './css/vanilla.css';
import SimonGame from './components/SimonGame';
import FibonacciClock from './components/FibonacciClock';
import FridgeApp from './components/FridgeApp';
import GameOfLife from './components/GameOfLife';

const navItems: NavItem[] = [
    { label: 'Home', id: '/#home' },
    { label: 'About', id: '/#about' },
    { label: 'Portfolio', id: '/#portfolio' },
    { label: 'Contact', id: '/#contact' },
];

const DrawerAppBar = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Toolbar items={navItems} name="Achilleas Papakonstantinou" />
        <Box component="main" position="relative" flex={1} display="flex" flexDirection="column">
            <MuiToolbar />
            <Routes>
                <Route index element={<Showcase />} />
                <Route path="portfolio">
                    <Route index element={<Error404 />} />
                    <Route path="pomodoro-clock" element={<PomodoroClock />} />
                    <Route path="local-weather" element={<LocalWeather />} />
                    <Route path="calculator" element={<Calculator />} />
                    <Route path="tic-tac-toe" element={<TicTacToe />} />
                    <Route path="simon-game" element={<SimonGame />} />
                    <Route path="fibonacci-clock" element={<FibonacciClock />} />
                    <Route path="fridge-app" element={<FridgeApp />} />
                    <Route path="game-of-life" element={<GameOfLife />} />
                </Route>
                <Route path="*" element={<Error404 />} />
            </Routes>
        </Box>
        <AppBar component="footer" position="static">
            <Signature />
        </AppBar>
    </Box>
);

export default DrawerAppBar;
