import { ICourse } from './course.interface';
import { INotification } from './notifiation.interface';
import { IRoute } from './route.interface';
import { IUser } from './user.interface';

export interface IAdmin extends IUser {
  course?: string[];
  route?: string[];
  notifications?: INotification[];
}
