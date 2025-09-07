import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Signature } from '../../shared/components';
import AppRoutes from './components/Routes';
import UserDropdown from './components/UserDropdown';

const App = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar component="nav">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Button href="/">
                        <Typography color="primary.contrastText">Property Management</Typography>
                    </Button>
                </Typography>
                <UserDropdown />
            </Toolbar>
        </AppBar>
        <Box component="main" position="relative" flex={1} display="flex" flexDirection="column">
            <Toolbar />
            <AppRoutes />
        </Box>
        <AppBar component="footer" position="static">
            <Signature linkColor="primary.contrastText" />
        </AppBar>
    </Box>
);

export default App;
