import { Role } from './Role.model';

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
};

export type RegisterUser = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}