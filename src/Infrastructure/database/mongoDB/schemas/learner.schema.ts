import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICalification } from '../../../../Domain';
import { RouteEntity } from '../../../../Domain/entities/route.entity';

export type LearnerDocument = Learner & Document;

@Schema({
  versionKey: false,
})
export class Learner {
  @Prop()
  calification: ICalification[];

  @Prop()
  route: RouteEntity[];

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false, unique: true })
  firebaseId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  photoUrl: string;

  @Prop({ required: true })
  rol: boolean;
}

export const LearnerSchema = SchemaFactory.createForClass(Learner);
