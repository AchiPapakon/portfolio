export interface CreateApartmentDto {
    city: string;
    street: string;
    floor: number | null;
    surface: number | null;
    energyClass: string | null;
    owner: string | null;
    tenant: string | null;
}

export interface Apartment extends CreateApartmentDto {
    id: number;
    userId: number;
}

export interface User {
    email: string;
    role: string;
    id: number;
    firstName: string;
    lastName: string;
}
