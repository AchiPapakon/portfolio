import { createContext } from 'react';
import type { Apartment, User } from '../types';

interface AppContextInterface {
    isAuthenticated: boolean | null;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    apartments: Apartment[];
    setApartments: React.Dispatch<React.SetStateAction<Apartment[]>>;
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
