interface Geolocation {
    lat: string;
    long: string;
}

interface Address {
    geolocation: Geolocation;
    city: string;
    street: string;
    number: number;
    zipcode: string;
}

interface Name {
    firstname: string;
    lastname: string;
}

export default class User {
    address: Address;
    id: number;
    email: string;
    username: string;
    password: string;
    name: Name;
    phone: string;
    __v: number;

    constructor(data: any) {
        this.address = data.address;
        this.id = data.id;
        this.email = data.email;
        this.username = data.username;
        this.password = data.password;
        this.name = data.name;
        this.phone = data.phone;
        this.__v = data.__v;
    }
}
