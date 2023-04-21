import { ICourse } from './course.interface';
import { IRoute } from './route.interface';
import { IUser } from './user.interface';

export interface IAdmin extends IUser {
  course: ICourse[];
  route: IRoute[];
  notifications: {
    id: string;
    repo: string;
    course: string;
  }[];
}
