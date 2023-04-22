import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IRoute } from 'express';
import { ICourse } from '../../../../Domain';
import { NotificationEntity } from '../../../../Domain/entities/notification.entity';

export type AdminDocument = Admin & Document;

@Schema({
  versionKey: false,
})
export class Admin {
  @Prop({ type: [{ type: Object }] })
  course?: ICourse[];

  @Prop({ type: [{ type: Object }] })
  route?: IRoute[];

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
