import { Species } from '@app/_models/species';

export interface PetOptions {
    petOwnerId?: string; //<-- The pet owner Id P.O
    petImage?:any;
    propertyId?:string; //<-- the property they reside Id Prop.
    propertyManagerId?:string; //<-- the property manager id of the place they reside at P.M
    petName: string;
    species: string;
    breed: string;
    rating?: number;
}
