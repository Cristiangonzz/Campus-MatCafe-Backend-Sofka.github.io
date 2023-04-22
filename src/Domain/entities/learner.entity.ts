import { ICalification, ILearner, IRoute } from '../interface';

export class LearnerEntity implements ILearner {
  calification: ICalification[];
  route: IRoute[];
  email: string;
  firebaseId?: string;
  name: string;
  photoUrl?: string;
  rol: boolean;

  constructor(
    name: string,
    email: string,
    rol: boolean,
    firebaseId?: string,
    photoUrl?: string,
  ) {
    this.name = name;
    this.email = email;
    this.firebaseId = firebaseId;
    this.photoUrl = photoUrl;
    this.rol = rol;
  }
}
