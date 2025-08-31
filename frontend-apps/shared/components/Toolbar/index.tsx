import {
    AppBar,
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar as MuiToolbar,
    styled,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import MenuIcon from '@mui/icons-material/Menu';
import type { NavItem } from './types';
import HoverButton from '../HoverButton';
import hoverEffect from '../HoverButton/hoverEffect';

const drawerWidth: number = 240;

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

interface ToolbarProps {
    items?: NavItem[];
    name?: string | React.ReactNode;
}

const Toolbar = ({ items = [], name = '' }: ToolbarProps) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen((prevMobileOpen) => !prevMobileOpen);
    };

    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const el = document.getElementById(location.hash.replace('#', ''));
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location.hash]);

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                {name}
            </Typography>
            <Divider />
            <List>
                {items.map(({ label, id }) => (
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
        <>
            <AppBar component="nav">
                <MuiToolbar>
                    <Typography variant="h6" color="secondary" sx={{ flexGrow: 1 }}>
                        {name}
                    </Typography>
                    <Box sx={displayWhenFull}>
                        {items.map(({ label, id }) => (
                            <HoverButton
                                key={id}
                                onClick={() => {
                                    const [path, hash] = id.split('#');
                                    navigate(path || '/');
                                    setTimeout(() => {
                                        if (hash) {
                                            window.location.hash = `#${hash}`;
                                        }
                                    }, 0);
                                }}
                            >
                                {label}
                            </HoverButton>
                        ))}
                    </Box>
                    <IconButton
                        color="secondary"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, ...displayWhenEmpty }}
                    >
                        <MenuIcon />
                    </IconButton>
                </MuiToolbar>
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
        </>
    );
};

export default Toolbar;
