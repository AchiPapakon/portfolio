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
    Paper,
    styled,
    Toolbar,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FreeCodeCampIcon from './free-code-camp.svg?react';
import profilePic from './profile-pic.jpg';
import IconButtonLink from './components/IconButtonLink';

interface NavItem {
    label: string;
    id: string;
}

const drawerWidth: number = 240;
const navItems: NavItem[] = [
    { label: 'Home', id: '#home' },
    { label: 'About', id: '#about' },
    { label: 'Portfolio', id: '#portfolio' },
    { label: 'Contact', id: '#contact' },
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

const Section = styled(Box)({
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
});

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

const textShadow: string = '2px 2px 2px #323232';

const DrawerAppBar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

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
        <>
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
                            <HoverButton key={id} href={id}>
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
            <Box component="main" position="relative" pb="50px">
                <Toolbar />
                <Section
                    id="home"
                    sx={{
                        backgroundImage: 'url(/background/acropolis.jpg)',
                        justifyContent: 'center',
                        minHeight: '100vh',
                    }}
                >
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h1" color="secondary" sx={{ fontWeight: 400, textShadow }}>
                            Achilleas
                        </Typography>
                        <Typography variant="h1" color="secondary" sx={{ fontWeight: 400, textShadow }}>
                            Papakonstantinou
                        </Typography>
                        <Typography
                            variant="h3"
                            color="secondary"
                            fontFamily="Dancing Script, cursive"
                            sx={{ textShadow }}
                        >
                            My personal portfolio page.
                        </Typography>
                        <Box component="hr" sx={{ borderColor: 'secondary.main', textShadow }} />
                    </Box>
                </Section>
                <Section
                    id="about"
                    sx={{
                        backgroundImage: 'url(/background/nice.jpg)',
                        justifyContent: 'center',
                        minHeight: '100vh',
                    }}
                >
                    <Box
                        sx={{
                            display: 'grid',
                            maxWidth: '1200px',
                            mt: { xs: '100px', sm: '100px', md: 'initial' },
                            gridTemplateColumns: { xs: '350px', sm: '350px', md: '350px 1fr' },
                            gap: { xs: '50px', sm: '50px', md: '200px' },
                        }}
                    >
                        <Box sx={{ display: 'grid', gap: 2, order: { xs: 1, sm: 1, md: 0 } }}>
                            <Paper sx={{ p: 3 }}>
                                <Typography variant="h3" fontFamily="Dancing Script, cursive">
                                    About me
                                </Typography>
                            </Paper>
                            <Paper sx={{ p: 3 }}>
                                <Typography>
                                    I am a Fullstack Developer since 2017 and I&apos;m currently based in Nice, France.
                                </Typography>
                                <Typography>I have built this website using:</Typography>
                                <Typography>Frontend:</Typography>
                                <ul>
                                    <Typography component="li">React</Typography>
                                    <Typography component="li">Material UI (MUI)</Typography>
                                    <Typography component="li">TypeScript</Typography>
                                    <Typography component="li">Vite</Typography>
                                </ul>
                                <Typography>Backend:</Typography>
                                <ul>
                                    <Typography component="li">NestJS</Typography>
                                    <Typography component="li">Vite</Typography>
                                    <Typography component="li">MySQL</Typography>
                                    <Typography component="li">Nginx</Typography>
                                    <Typography component="li">Ubuntu</Typography>
                                </ul>
                            </Paper>
                        </Box>
                        <Box
                            component="img"
                            src={profilePic}
                            sx={{ borderRadius: '50%', marginLeft: 'auto', marginRight: 'auto' }}
                        />
                    </Box>
                </Section>
                <Section id="contact" sx={{ backgroundImage: 'url(/background/contact.jpg)', minHeight: '410px' }}>
                    <Box sx={{ marginLeft: '10%', display: 'grid', gap: 1 }}>
                        <Typography variant="h3" color="secondary" fontFamily="Dancing Script, cursive">
                            Contact me
                        </Typography>
                        <IconButtonLink
                            href="https://www.linkedin.com/in/achilleas-papakonstantinou-aa6447113/"
                            sx={{ color: '#007bb5', backgroundColor: 'secondary.main' }}
                        >
                            <LinkedInIcon style={{ width: 45, height: 45 }} />
                        </IconButtonLink>
                        <Typography color="secondary">Papakonstantinou.Achilleas (at) gmail.com</Typography>
                        <Box component="hr" width="100%" />
                        <Typography color="secondary">Bonus Portfolio:</Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButtonLink
                                href="https://github.com/AchiPapakon?tab=repositories&type=source"
                                sx={{ color: '#24292e', backgroundColor: 'secondary.main' }}
                            >
                                <GitHubIcon style={{ width: 30, height: 30 }} />
                            </IconButtonLink>
                            <IconButtonLink
                                href="https://www.freecodecamp.org/achipapakon"
                                sx={{ backgroundColor: 'secondary.main' }}
                            >
                                <FreeCodeCampIcon fill="#006400" width="42" height="42" />
                            </IconButtonLink>
                        </Box>
                    </Box>
                </Section>
                <AppBar component="footer" position="absolute" sx={{ left: 0, right: 0, bottom: 0, top: 'auto' }}>
                    <Toolbar sx={{ justifyContent: 'center', gap: 0.5, flexDirection: { xs: 'column', sm: 'row' } }}>
                        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: 'inherit' }}>
                            <Typography>Coded by</Typography>
                            <Typography
                                component="a"
                                fontWeight={700}
                                href="https://www.achipapakon.com"
                                target="_blank"
                                rel="noopener"
                                sx={{
                                    color: 'secondary.main',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        color: 'secondary.main',
                                    },
                                    '&:after': {
                                        display: 'block',
                                        content: '""',
                                        borderBottom: 'solid 1px #fff',
                                        transform: 'scaleX(0)',
                                        transition: 'transform 250ms ease-in-out',
                                    },
                                    '&:hover:after': {
                                        transform: 'scaleX(1)',
                                    },
                                }}
                            >
                                Achilleas Papakonstantinou
                            </Typography>
                        </Box>
                        <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>|</Typography>
                        <Typography>Copyright © 2016-{new Date().getFullYear()}</Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
};

export default DrawerAppBar;
