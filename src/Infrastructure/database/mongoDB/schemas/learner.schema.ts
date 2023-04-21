import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ILearner, ICalification } from '../../../../Domain';
import { RouteEntity } from '../../../../Domain/entities/route.entity';

export type LearnerDocument = LearnerEntity & Document;

@Schema()
export class LearnerEntity implements ILearner {
  @Prop()
  calification: ICalification[];

  @Prop()
  route: RouteEntity[];

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  firebaseId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  photoUrl: string;

  @Prop({ required: true })
  rol: boolean;
}

export const LearnerSchema = SchemaFactory.createForClass(LearnerEntity);
