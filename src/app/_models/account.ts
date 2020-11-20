import { Role } from './role';
import { Pet } from './pet'
import { Property } from './property';

export class Account {
    id: string;
    propertyId?:string;//<-----That I belong to, or a resident of
    propertyManagerId?:string;//<-----That I belong to, or a resident of
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    petOwnerPets?:[Pet];
    petOwnerPetsCount?:number;
    jwtToken?: string;
    propertyManagerPetOwnersCount?:number;
    propertyManagerPetsCount?:number;
    propertyManagerPetOwners?:[Account];
    propertyManagerPets?:[Pet];
    propertyManagerProperties?:[Property];

}
