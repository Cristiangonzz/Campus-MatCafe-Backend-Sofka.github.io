import { ICalification, ILearner } from '../interface';

export class LearnerEntity implements ILearner {
  calification: ICalification[];
  route: string[];
  email: string;
  firebaseId?: string;
  name: string;
  photoUrl?: string;
  rol: boolean;
  id?: string;

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
