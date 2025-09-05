export interface Apartment {
    id: number;
    userId: number;
    city: string;
    street: string;
    floor: number | null;
    surface: number | null;
    energyClass: string | null;
    owner: string | null;
    tenant: string | null;
}

export interface User {
    email: string;
    role: string;
    id: number;
    firstName: string;
}
