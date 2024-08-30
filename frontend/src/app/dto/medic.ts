export interface Hospital {
    id: number,
    name: string,
    city: string,
    lat: number,
    lng: number
}
export interface Specialization {
    id: number,
    name: string,
    products: Product[]
}
export interface Product {
    id: number,
    name: string,
    price: number
}

export interface Medic {
    id: number,
    first_name: string,
    last_name: string,
    title: string | null,
    specialization: Specialization | null,
    hospital: Hospital | null,
    image: string | null
}