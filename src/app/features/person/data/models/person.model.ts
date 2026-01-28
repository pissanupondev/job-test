export interface IPerson {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;   
  address: string;
}

export type CreatePerson = Omit<IPerson, 'id'>;