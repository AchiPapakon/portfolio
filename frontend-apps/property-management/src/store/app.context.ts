import { createContext } from 'react';
import type { Apartment, User } from '../types';

interface AppContextInterface {
    isAuthenticated: boolean | null;
    setIsAuthenticated: (value: boolean | null) => void;
    user: User | null;
    setUser: (user: User | null) => void;
    apartments: Apartment[];
    setApartments: (apartments: Apartment[]) => void;
}

const AppContext = createContext<AppContextInterface>({
    isAuthenticated: null,
    setIsAuthenticated: () => {},
    user: null,
    setUser: () => {},
    apartments: [],
    setApartments: () => {},
});

export default AppContext;
