import { useMemo, useState } from 'react';
import AppContext from './app.context';
import type { Apartment, User } from '../types';

interface AppContextProviderProps {
    children: React.ReactNode;
}

const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [apartments, setApartments] = useState<Apartment[]>([]);

    const value = useMemo(
        () => ({ isAuthenticated, setIsAuthenticated, user, setUser, apartments, setApartments }),
        [isAuthenticated, user, apartments]
    );

    return <AppContext value={value}>{children}</AppContext>;
};

export default AppContextProvider;
