import { ICalification } from './calification.interface';
import { IUser } from './user.interface';

export interface ILearner extends IUser {
  calification: ICalification[];
  route: string[];
  id?: string;
}
