import { Pet } from '@app/_models';

export interface PropertyOptions{
  propertyManagerId?:string; //<-- The Account Id of the property manager
  petOwnerId?:string; //<-- The Account Id of the pet owner which is the renter
  propertyName?: string;
  houseUnitNumber:string;
  street: string;
  city: string;
  state: string;
  zip: string;
  petCount?: number;
  pets?:[Pet];
}
