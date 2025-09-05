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
                index
                element={
                    <PrivateRoute>
                        <ApartmentsList />
                    </PrivateRoute>
                }
            />
            <Route
                path="/settings"
                element={
                    <PrivateRoute>
                        <Settings />
                    </PrivateRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <PrivateRoute reverse>
                        <Register />
                    </PrivateRoute>
                }
            />
            <Route
                path="/login"
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
