import { IAdmin, ICourse, IRoute } from '../interface';
import { NotificationEntity } from './notification.entity';

export class AdminEntity implements IAdmin {
  course?: ICourse[];
  route?: IRoute[];
  notifications?: NotificationEntity[];
  email: string;
  firebaseId: string;
  name: string;
  photoUrl: string;
  rol: boolean;

  constructor(
    name: string,
    email: string,
    firebaseId: string,
    photoUrl: string,
    rol: boolean,
  ) {
    this.name = name;
    this.email = email;
    this.firebaseId = firebaseId;
    this.photoUrl = photoUrl;
    this.rol = rol;
  }
}
