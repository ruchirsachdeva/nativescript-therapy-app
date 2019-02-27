export interface Player {
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
  therapyId: string|number;
  patient: Player
  med: Player

}

export interface TherapyList {
  name: string;
  dosage: string
  medicine: Medicine
}

export interface Medicine {
  name: string;
}