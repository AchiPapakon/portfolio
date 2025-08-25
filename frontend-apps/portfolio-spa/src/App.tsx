import {
    AppBar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    styled,
    Toolbar,
    Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Route, Routes, useNavigate, useLocation } from 'react-router';
import Showcase from './components/Showcase';
import Error404 from './components/Error404';
import LocalWeather from './components/LocalWeather';
import Signature from './components/Signature';
import Calculator from './components/Calculator';
import PomodoroClock from './components/PomodoroClock';
import TicTacToe from './components/TicTacToe';
import './css/vanilla.css';
import SimonGame from './components/SimonGame';
import FibonacciClock from './components/FibonacciClock';
import FridgeApp from './components/FridgeApp';

interface NavItem {
    label: string;
    id: string;
}

const drawerWidth: number = 240;
const navItems: NavItem[] = [
    { label: 'Home', id: '/#home' },
    { label: 'About', id: '/#about' },
    { label: 'Portfolio', id: '/#portfolio' },
    { label: 'Contact', id: '/#contact' },
];

const hoverEffect = {
    '&::before, &::after': {
        display: 'inline-block',
        opacity: 0,
        transition: 'transform 0.3s, opacity 0.2s',
    },
    '&::before': {
        marginRight: '10px',
        content: '"["',
        transform: 'translateX(20px)',
    },
    '&::after': {
        marginLeft: '10px',
        content: '"]"',
        transform: 'translateX(-20px)',
    },
    '&:hover::before, &:hover::after, &:focus::before, &:focus::after': {
        opacity: 1,
        transform: 'translateX(0px)',
    },
};

const HoverButton = styled(Button)(({ theme }) => ({
    color: theme.palette.secondary.main,
    ...hoverEffect,
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
    },
}));

const displayWhenFull = {
    display: {
        xs: 'none',
        sm: 'none',
        md: 'block',
    },
};

const displayWhenEmpty = {
    display: {
        md: 'none',
    },
};

const DrawerAppBar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const el = document.getElementById(location.hash.replace('#', ''));
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location.hash]);

    const handleDrawerToggle = () => {
        setMobileOpen((prevMobileOPen) => !prevMobileOPen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Achilleas Papakonstantinou
            </Typography>
            <Divider />
            <List>
                {navItems.map(({ label, id }) => (
                    <ListItem key={id} disablePadding>
                        <ListItemButton href={id} sx={{ textAlign: 'center', ...hoverEffect }}>
                            <ListItemText primary={label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="secondary"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, ...displayWhenEmpty }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="secondary" sx={{ flexGrow: 1, ...displayWhenFull }}>
                        Achilleas Papakonstantinou
                    </Typography>
                    <Box sx={displayWhenFull}>
                        {navItems.map(({ label, id }) => (
                            <HoverButton
                                key={id}
                                onClick={() => {
                                    const [path, hash] = id.split('#');
                                    navigate(path || '/');
                                    setTimeout(() => {
                                        window.location.hash = `#${hash}`;
                                    }, 0);
                                }}
                            >
                                {label}
                            </HoverButton>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <StyledDrawer
                component="nav"
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={displayWhenEmpty}
            >
                {drawer}
            </StyledDrawer>
            <Box component="main" position="relative" flex={1} display="flex" flexDirection="column">
                <Toolbar />
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
                    </Route>
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </Box>
            <AppBar component="footer" position="static">
                <Signature />
            </AppBar>
        </Box>
    );
};

export default DrawerAppBar;
