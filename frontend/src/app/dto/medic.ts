export interface Hospital {
    id: number,
    name: string,
    address: string,
}
export interface Specialization {
    id: number,
    name: string,
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