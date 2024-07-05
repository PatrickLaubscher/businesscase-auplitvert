export interface AllowedUrl {
    url: string;
    methods: string[];
}

export interface Credentials {
    username: string,
    password: string
}

export interface Token {
    token: string;
    refresh_token: string;
}

export interface User {
    roles: string[],
    email: string;
    firstname: string;
    lastname: string;
}

export interface Admin {
    civility: string,
    firstname: string,
    lastname: string,
    phone: string,
    email: string,
}

export interface Employee {
    civility: string,
    firstname: string,
    lastname: string,
    phone: string,
    email: string,
    orderLines: string[]
    status: string
    creationDate: string
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