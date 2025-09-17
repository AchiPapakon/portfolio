// import Error404 from '../Helper/Error404.jsx';

import { AppBar, Box, Toolbar as MuiToolbar, useTheme } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router';
import Signature from 'shared/components/Signature';
import { HoverButton, Toolbar } from 'shared/components';
import Home from './Home';
import Footer from './Footer';
import Info from './Info';
import Contact from './Contact';
import backgroundImg from './background.jpg';
import Error404 from './Error404';

const navItems = [
    { label: 'Home', id: `${import.meta.env.VITE_ROUTE_PATH}/` },
    { label: 'Info', id: `${import.meta.env.VITE_ROUTE_PATH}/info` },
    { label: 'Contact', id: `${import.meta.env.VITE_ROUTE_PATH}/contact` },
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
                backgroundImage: `url(${backgroundImg})`,
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
                            navigate(`${import.meta.env.VITE_ROUTE_PATH}/`);
                        }}
                    >
                        janedoe.com
                    </HoverButton>
                }
            />
            <Box component="main" position="relative" flex={1} display="flex" flexDirection="column">
                <MuiToolbar />
                <Routes>
                    <Route path={`${import.meta.env.VITE_ROUTE_PATH}/`} element={<Home />} />
                    <Route path={`${import.meta.env.VITE_ROUTE_PATH}/info`} element={<Info />} />
                    <Route path={`${import.meta.env.VITE_ROUTE_PATH}/contact`} element={<Contact />} />
                    <Route path="*" element={<Error404 />} />
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
