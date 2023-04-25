import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationEntity } from '../../../../Domain/entities/notification.entity';
import { Course } from './course.schema';
import { Route } from './route.schema';

export type AdminDocument = Admin & Document;

@Schema({
  versionKey: false,
})
export class Admin {
  @Prop({ type: [{ type: Object }] })
  @ApiProperty()
  course?: Course[];

  @Prop({ type: [{ type: Object }] })
  @ApiProperty()
  route?: Route[];

  @Prop({ type: [{ type: Object }] })
  @ApiProperty()
  notifications?: NotificationEntity[];

  @Prop({ type: String, required: true, unique: true })
  @ApiProperty()
  email: string;

  @Prop({ required: false, unique: true, sparse: true })
  @ApiProperty()
  firebaseId?: string;

  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop({ required: false })
  @ApiProperty()
  photoUrl?: string;

  @Prop({ required: true })
  @ApiProperty()
  rol: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
