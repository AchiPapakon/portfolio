import { useContext, useRef, useState } from 'react';
import { Box, Button, ClickAwayListener, Divider, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import { useNavigate } from 'react-router';
import AppContext from '../store/app.context';
import { logout } from '../api';

const UserDropdown = () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const { isAuthenticated, setIsAuthenticated, user } = useContext(AppContext);
    const navigate = useNavigate();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current?.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    const handleListKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    };

    const handleLogoutClick = async () => {
        try {
            await logout();
            setIsAuthenticated(false);
            navigate('/register');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <Box>
            <Button ref={anchorRef} variant="contained" onClick={handleToggle}>
                {isAuthenticated ? user?.firstName : 'User'}
            </Button>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="top-start"
                transition
                disablePortal
            >
                {({ TransitionProps }) => (
                    <Grow
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...TransitionProps}
                        style={{
                            transformOrigin: 'top',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                {isAuthenticated ? (
                                    <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown} onClick={handleClose}>
                                        <MenuItem onClick={() => navigate('/')}>Apartments</MenuItem>
                                        <Divider />
                                        <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem>
                                        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                                    </MenuList>
                                ) : (
                                    <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown} onClick={handleClose}>
                                        <MenuItem onClick={() => navigate('/register')}>Register</MenuItem>
                                        <MenuItem onClick={() => navigate('/login')}>Login</MenuItem>
                                    </MenuList>
                                )}
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Box>
    );
};

export default UserDropdown;
