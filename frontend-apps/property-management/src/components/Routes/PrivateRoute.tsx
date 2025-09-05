import { useContext, useEffect, type JSX } from 'react';
import { CircularProgress } from '@mui/material';
import { Navigate } from 'react-router';
import AppContext from '../../store/app.context';
import { checkAuth } from '../../api';

interface PrivateRouteProps {
    children: JSX.Element;
    reverse?: boolean;
}

const PrivateRoute = ({ children, reverse = false }: PrivateRouteProps) => {
    const { isAuthenticated, setIsAuthenticated, setUser } = useContext(AppContext);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const user = await checkAuth();
                if (user) {
                    setIsAuthenticated(true);
                    setUser(user);
                }
            } catch (error) {
                console.error('Error checking auth status:', error);
                setIsAuthenticated(false);
            }
        };

        if (!isAuthenticated) {
            checkAuthStatus();
        }
    }, [isAuthenticated, setIsAuthenticated, children, setUser]);

    if (isAuthenticated === null) {
        return <CircularProgress />;
    }

    if (reverse) {
        return !isAuthenticated ? children : <Navigate to="/" />;
    }

    return isAuthenticated ? children : <Navigate to="/register" />;
};

export default PrivateRoute;
