import { Pet, Role } from '@app/_models';

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
  role?: Role;
  pets?:[Pet];
  jwtToken?: string;
}
