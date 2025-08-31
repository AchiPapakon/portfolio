// import Error404 from '../Helper/Error404.jsx';

import { AppBar, Box, Toolbar as MuiToolbar, useTheme } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router';
import Signature from 'shared/components/Signature';
import { HoverButton, Toolbar } from 'shared/components';
import Home from './Home';
import Footer from './Footer';
import Info from './Info';
import Contact from './Contact';

const navItems = [
    { label: 'Home', id: '/' },
    { label: 'Info', id: '/info' },
    { label: 'Contact', id: '/contact' },
];

const JaneDoe = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundImage: 'url(/background.jpg)',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            <Toolbar
                items={navItems}
                name={
                    <HoverButton
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        janedoe.com
                    </HoverButton>
                }
            />
            <Box component="main" position="relative" flex={1} display="flex" flexDirection="column">
                <MuiToolbar />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/info" element={<Info />} />
                    <Route path="/contact" element={<Contact />} />
                    {/* <Route path="*" element={<Error404 />} /> */}
                </Routes>
            </Box>
            <Footer />
            <AppBar component="footer" position="static">
                <Signature underlineColor={theme.palette.secondary.main} />
            </AppBar>
        </Box>
    );
};

export default JaneDoe;
