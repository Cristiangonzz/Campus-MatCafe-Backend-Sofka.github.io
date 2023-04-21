import { ICalification } from './calification.interface';
import { IRoute } from './route.interface';
import { IUser } from './user.interface';

export interface ILearner extends IUser {
  calification: ICalification[];
  route: IRoute[];
}