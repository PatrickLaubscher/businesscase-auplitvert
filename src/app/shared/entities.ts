/* Authentication */

export interface AllowedUrl {
    url: string;
    methods: string[];
}

export interface Credentials {
    username: string;
    password: string;
}

export interface Token {
    token: string;
    refresh_token: string;
}


export interface ApiListResponse<T> {
    '@id': string;
    '@type': string;
    '@context': string;
    'hydra:totalItems': number;
    'hydra:member': T[];
}

export interface ApiRessource<T> {
    '@id': string;
    '@type': string;
    '@context': string;
    'hydra:member': T[];
}


/* Users */
export interface User {
    id: number;
    roles: string[];
    email: string;
    firstname: string;
    lastname: string;
}


export interface Admin {
    id: number;
    civility: Civility;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
}

export interface newAdmin {
    civility: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    password: string;
    roles: string[];
    discr: string;
}

export interface patchAdmin {
    civility: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
}


export interface Employee {
    id: number;
    civility: Civility;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    employee_status: EmployeeStatus;
    creationDate: string;
    orderLines: OrderLine[];
}

export interface patchEmployee {
    civility: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
}

export interface newEmployee {
    civility: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    password: string;
    employee_status: string;
    roles: string[];
    discr: string;
    creationDate: string;
}

export interface Customer {
    civility: Civility;
    firstname: string;
    lastname: string;
    address: string;
    city: City;
    email: string;
    phone: string;
    creationDate: string;
}

export interface newCustomer {
    civility: string;
    firstname: string;
    lastname: string;
    address: string;
    city: string;
    email: string;
    password: string;
    phone: string;
    roles: string[];
    discr: string;
    creationDate: string;
}

export interface patchCustomer {
    civility: string;
    firstname: string;
    lastname: string;
    address: string;
    city: string;
    phone: string;
    email: string;
}


export interface Civility {
    id: number;
    name: string;
    abreviation: string;
}


export interface City {
    id: number;
    name: string;
    zip_code: string;
}


export interface EmployeeStatus {
    id: number;
    name: string;
}


/* Category & products */

export interface Category {
    id: number;
    name: string;
    coef_price: number;
    products: Product[];
    attributionPrestationCategories : {Prestation : Prestation[]}[];   
}

export interface NewCategory {
    name: string;
    coef_price: number;
}

export interface PatchCategory {
    id: number;
    name: string;
    coef_price: number;
}

export interface Product {
    id: number;
    name: string;
    category: Category;
    coef_price: number;
}

export interface NewProduct {
    name: string;
    category: string;
    coef_price: number;
}

export interface PatchProduct {
    id: number;
    name: string;
    category: string;
    coef_price: number;
}



/* Services */

export interface Prestation {
    id: number;
    name: string;
    base_price: number;
}

export interface PrestationWithAttribution {
    id: number;
    name: string;
    base_price: number;
    attributionPrestationCategories: AttributionPrestationCategory[];
}

export interface NewPrestation {
    name: string;
    base_price: number;
}

export interface AttributionPrestationCategory {
    id: number;
    prestation: string;
    Category: Category[];
}


export interface PatchPrestation {
    id: number;
    name: string;
    base_price: number;
}




/* Orders */

export interface Order {
    id: number;
    date: string;
    orderLines: OrderLine[];
    customer: Customer;
}

export interface NewOrder {
    date: string;
    customer: string;
    paymentMode: string;
}


export interface OrderLine {
    id: number;
    product: Product;
    prestation: Prestation;
    order_line_status: OrderLineStatus;
    main_order: Order;
    qty: number;
    employee: Employee;
}

export interface NewOrderLine {
    main_order: string;
    product: string;
    prestation: string;
    order_line_status: string;
    qty: number;
    price: number;
}


export interface OrderLineStatus {
    id: number;
    name: string;
}


export interface CartLineOrder {
    product: Product;
    category: Category;
    prestation: Prestation;
    quantity: number;
    unitPrice: number;
    totalPrice: number;  
};


export interface PaymentMode {
    id: number;
    name: string;
}

