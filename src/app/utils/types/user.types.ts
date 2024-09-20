export type User = {
    id: number;
    name: string,
    email: string,
    password?: string,
    isAdmin?: boolean,
    preferences?:string,
    allergies?:string
  }
