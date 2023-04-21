import { IAdmin, ICourse, IRoute } from '../interface';

export class Admin implements IAdmin {
  course?: ICourse[];
  route?: IRoute[];
  notifications?: { id: string; repo: string; course: string }[];
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
