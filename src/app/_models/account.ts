import { Role } from './role';
import { Pet } from './pet'

export class Account {
    id: string;
    propertyId?:string;//<-----That I belong to, or a resident of
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    pets?:[Pet];
    jwtToken?: string;

}
