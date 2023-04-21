import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IRoute } from 'express';
import { ICourse } from '../../../../Domain';
import { NotificationEntity } from '../../../../Domain/entities/notification.entity';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
  @Prop({ type: [{ type: Object }] })
  course?: ICourse[];

  @Prop({ type: [{ type: Object }] })
  route?: IRoute[];

  @Prop({ type: [{ type: Object, ref: 'Notification' }] })
  notifications?: NotificationEntity[];

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  firebaseId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  photoUrl: string;

  @Prop({ required: true })
  rol: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
