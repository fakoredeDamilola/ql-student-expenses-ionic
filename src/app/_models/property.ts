import { Pet } from "@app/_models"

export class Property {
    id: string; //<-- The Id of the property
    propertyManagerId:string; //<-- The Account Id of the property manager
    propertyPetOwner?:any;
    petOwnerId?:string; //<-- The Account Id of the pet owner which is the renter
    propertyName?: string;
    houseUnitNumber:string;
    street: string;
    city: string;
    state: string;
    zip: string;
    propertyPetsCount?: number;
    pets?:[Pet];
    propertyPetOwnerCount?:number;
    petOwner?:[Account];
    propertyPets: [Pet];
    propertyManager: { id:string, title: string; firstName: string; lastName: string; isVerified: boolean; email: string; };

}
