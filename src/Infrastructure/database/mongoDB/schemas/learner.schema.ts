import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICalification } from '../../../../Domain';
import { RouteEntity } from '../../../../Domain/entities/route.entity';
import { ApiProperty } from '@nestjs/swagger';

export type LearnerDocument = Learner & Document;

@Schema({
  versionKey: false,
})
export class Learner {
  @Prop()
  @ApiProperty()
  calification: ICalification[];

  @Prop()
  @ApiProperty()
  route: RouteEntity[];

  @Prop({ required: true, unique: true })
  @ApiProperty()
  email: string;

  @Prop({ required: false, unique: true })
  @ApiProperty()
  firebaseId: string;

  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop({ required: false })
  @ApiProperty()
  photoUrl: string;

  @Prop({ required: true })
  @ApiProperty()
  rol: boolean;
}

export const LearnerSchema = SchemaFactory.createForClass(Learner);
