import { Species } from './species';

export class Pet {
    id: string;
    petOwnerId: string; //<-- The pet owner Id P.O
    propertyId?:string; //<-- the property they reside Id Prop.
    propertyManagerId?:string; //<-- the property manager id of the place they reside at P.M
    petName: string;
    species: Species;
    breed: string;
    rating: number;
}
