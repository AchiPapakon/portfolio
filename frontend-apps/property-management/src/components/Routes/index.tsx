import { Route, Routes } from 'react-router';
import ApartmentsList from '../ApartmentsList';
import Register from '../Register';
import Login from '../Login';
import Error404 from '../Error404';
import PrivateRoute from './PrivateRoute';
import Settings from '../Settings';

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path={`${import.meta.env.VITE_ROUTE_PATH}/`}
                element={
                    <PrivateRoute>
                        <ApartmentsList />
                    </PrivateRoute>
                }
            />
            <Route
                path={`${import.meta.env.VITE_ROUTE_PATH}/settings`}
                element={
                    <PrivateRoute>
                        <Settings />
                    </PrivateRoute>
                }
            />
            <Route
                path={`${import.meta.env.VITE_ROUTE_PATH}/register`}
                element={
                    <PrivateRoute reverse>
                        <Register />
                    </PrivateRoute>
                }
            />
            <Route
                path={`${import.meta.env.VITE_ROUTE_PATH}/login`}
                element={
                    <PrivateRoute reverse>
                        <Login />
                    </PrivateRoute>
                }
            />
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
};

export default AppRoutes;
