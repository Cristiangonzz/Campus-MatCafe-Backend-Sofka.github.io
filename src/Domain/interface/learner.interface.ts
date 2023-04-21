import { Calification } from './calification.interface';
import { IRoute } from './route.interface';
import { IUser } from './user.interface';

export interface Learner extends IUser {
  calification: Calification[];
  route: IRoute[];
}
