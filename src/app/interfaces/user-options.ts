import { Pet, Property, Role } from '@app/_models';

export interface UserOptions {
  propertyId?:string;
  propertyManagerId?:string;
  email?: string;
  password?: string;
  confirmPassword?:string;
  firstName?:string;
  lastName?: string;
  title?: string;
  acceptTerms?: Boolean;
  role?: string;
  petOwnerPets?:[Pet];
  jwtToken?: string;
  propertyManagerPetOwnersCount?:number;
  propertyManagerPetsCount?:number;
  propertyManagerPetOwners?:[Account];
  propertyManagerPets?:[Pet];
  propertyManagerProperties?:[Property];
}
