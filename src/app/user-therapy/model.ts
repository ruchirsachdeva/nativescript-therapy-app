export interface User {
//  id: number;
//  name: string;
//  role: string;
    userId: string|number;
    email?: string;
    username?: string;
    role?: Role;
    organization?: Organization;
    lat?: string;
    longitude?: string;
}

export interface Organization {
    name?: string;
}

export interface Role {
    name?: string;
}



export interface Therapy {
    therapyId: string | number;
    patient: User;
    med: User;
    therapylist: TherapyList;
}

export interface TherapyList {
    therapyListId: string | number;
    name: string;
    dosage: string;
    medicine: Medicine;
}

export interface Medicine {
    medicineId: string | number;
    name: string;
}
