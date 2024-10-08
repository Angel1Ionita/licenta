export interface UserAppointmentDto {
    specialization: string;
    product: string;
    medic: string | null;
    hospital: string;
    date: string;
    time: string | null;
    description: string | null;
}

export interface AppointmentDto {
    userId: string;
    specialization: string;
    product: string;
    medic: string;
    hospital: string;
    date: string;
    time: string;
    description: string | null;
}

export interface UserAppointmentResponse {
    id: number,
    user: {
        id: number,
        firstName: string;
        lastName: string;
        email: string;
    },
    hospital: {
        id: number,
        name: string;
    },
    medic: {
        id: number,
        firstName: string;
        lastName: string;
        image: string;
    },
    specialization: {
        id: number,
        name: string;
    },
    product: {
        id: number,
        name: string;
    },
    date: Date | string,
    time: string,
    description: string,

}

export interface AppointmentResponse {
    id: number,
    user: {
        id: number,
        firstName: string;
        lastName: string;
        email: string;
    },
    hospital: {
        id: number,
        name: string;
    },
    medic: {
        id: number,
        firstName: string;
        lastName: string;
        image: string;
    },
    specialization: {
        id: number,
        name: string;
    },
    product: {
        id: number,
        name: string;
    },
    date: Date | string,
    time: string,
    description: string,
    summary: string | null,

}
