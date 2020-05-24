import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';

export const enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  TRANCE = 'TRANCE'
}

export const enum Role {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER'
}

export interface ICustomer {
  id?: number;
  idCustomer?: string;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  email?: string;
  phone?: string;
  city?: string;
  signinDate?: Moment;
  role?: Role;
  user?: IUser;
}

export const defaultValue: Readonly<ICustomer> = {};
