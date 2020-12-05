import { Role } from './role';

export class Account {
    id: string;
    reportId?:string;//<-----That I belong to, or a resident of
    reportsManagerId?:string;//<-----That I belong to, or a resident of
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    //petOwnerPets?:[Pet];
    petOwnerPetsCount?:number;
    jwtToken?: string;
    propertyManagerPetOwnersCount?:number;
    propertyManagerPetsCount?:number;
    propertyManagerPetOwners?:[Account];
    //propertyManagerPets?:[Pet];
    //propertyManagerProperties?:[Property];
    created: string;
    isVerified: boolean;
    updated: string;
  studentExpenses: [import("/Users/mike/Documents/another one ql/student-expenses-ionic/client/src/app/_models/expense").Expense];
    //petOwnerProperty?: Property;
}
