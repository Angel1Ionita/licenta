export interface UserAppointmentDto {
    specialization: string;
    medic: string | null;
    date: string;
    time: string | null;
    description: string | null;
}

export interface AppointmentDto {
    userId: string;
    specialization: string;
    medic: string;
    date: string;
    time: string;
    description: string | null;
}

export interface UserAppointmentResponse {
    user: {
        firstName: string;
        lastName: string;
        email: string;
    }
    hospital: {
        name: string;
    };
    medic: string;
    specialization: {
        name: string;
    };
    date: Date | string;
    time: string;
    description: string;
    // user: {
    //     firstName: string;
    //     lastName: string;
    //     email: string;
    // }

}

export interface AppointmentResponse {
    user: {
        firstName: string;
        lastName: string;
        email: string;
    }
    hospital: {
        name: string;
    };
    medic: {
        firstName: string;
        lastName: string;
        image: string;
    }
    specialization: {
        name: string;
    };
    date: Date | string;
    time: string;
    description: string;


}
