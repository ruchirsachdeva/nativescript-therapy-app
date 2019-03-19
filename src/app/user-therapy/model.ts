import {ImageSource} from "tns-core-modules/image-source";
export interface User {
//  id: number;
//  role: string;
    userId: string | number;
    email?: string;
    username?: string;
    firstName: string;
    role?: Role;
    organization?: Organization;
    lat?: string;
    longitude?: string;
    base64?: string
    imageSource?: string
}


export function isPatient(user: User) {
    return user.role.name === 'patient';
}

type MyFunctionType = (role: Role) => boolean;

export interface Organization {
    organizationId: string | number;
    name?: string;
}

export interface Role {
    name?: string;
}


export interface Therapy {
    therapyId: string | number;
    patient: User;
    med: User;
    duration: Duration;
}


interface Note {
    noteId: string | number;
    note?: string;
    testSessionId: string | number;
}

export interface TestSession {
//  id: number;
//  name: string;
//  role: string;
    duration: Duration;
    testSessionId: string | number;
    testType?: string | number;
    therapy?: Therapy;
    notes?: Note[];
    requestedHours: number;
}

export interface Duration {
    startTime?: string;
    endTime?: string;
}
