import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NotificationEntity } from '../../../../Domain/entities/notification.entity';
import { Course } from './course.schema';
import { Route } from './route.schema';

export type AdminDocument = Admin & Document;

@Schema({
  versionKey: false,
})
export class Admin {
  @Prop({ type: [{ type: Object }] })
  course?: Course[];

  @Prop({ type: [{ type: Object }] })
  route?: Route[];

  @Prop({ type: [{ type: Object, ref: 'Notification' }] })
  notifications?: NotificationEntity[];

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ required: false, unique: true })
  firebaseId?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  photoUrl?: string;

  @Prop({ required: true })
  rol: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
