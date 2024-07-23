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


export interface ApiListResponse<T> extends ApiRessource {
    '@id': string;
    'hydra:totalItems': number;
    'hydra:member': T[];
}

export interface ApiRessource {
    '@id': string;
    id: number;
}


/* Users */
export interface User {
    roles: string[];
    email: string;
    firstname: string;
    lastname: string;
}


export interface Admin {
    civility: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
}

export interface Employee {
    id: string;
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


export interface Civility{
    id: string;
    name: string;
    abreviation: string;
}


export interface City {
    id: string;
    name: string;
    zip_code: string;
}


export interface EmployeeStatus {
    id: string;
    name: string;
}


/* Category & products */

export interface Category {
    id : number;
    name: string;
    coef_price: number;
}

export interface NewCategory {
    name: string;
    coef_price: number;
}

export interface Product extends ApiRessource {
    name: string;
    category: Category;
}

export interface NewProduct {
    name: string;
    category: string;
}

export interface PatchProduct {
    id: number;
    name: string;
    category: string;
}



/* Services */

export interface Prestation {
    id: number;
    name: string;
    base_price: number;
}

export interface NewPrestation {
    name: string;
    base_price: number;
}



/* Orders */

export interface Order {
    id: string;
    date: string;
    orderLines: OrderLine[];
    customer: Customer;
}

export interface newOrder {
    date: string;
    orderLines: OrderLine[];
    customer: Customer;
}


export interface OrderLine extends ApiRessource {
    product: Product;
    prestation: Prestation;
    order_line_status: OrderLinesStatus;
    main_order: Order;
    qty: number;
    employee: Employee;
}

export interface NewOrderLine {
    product: {name:string};
    prestation: Prestation;
    order_line_status: {name:string};
    main_order:{id:string};
    qty:number;
}


export interface OrderLinesStatus {
    id: string;
    name: string;
}


export interface CartItem {
    productId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;  
};

