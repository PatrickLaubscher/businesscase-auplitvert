export interface AllowedUrl {
    url: string;
    methods: string[];
}

export interface UserAuthen {
    username: string,
    password: string
}

export interface User {
    id: number,
    roles: string[],
    email: string;
    firstname: string;
    lastname: string;
}

export interface Admin {
    id: number,
    civility: string,
    firstname: string,
    lastname: string,
    phone: string,
    email: string,
}

export interface newCustomer {
    civility: string,
    firstname: string,
    lastname: string,
    address: string,
    city: string,
    email: string,
    password: string,
    phone: string,
    roles: string[],
    discr: string,
    creationDate: string
}


export interface Civility{
    id: string,
    name: string,
    abreviation: string
}


export interface City {
    id: string,
    name: string,
    cp: string
}

export interface category {
    name: string;
    
}