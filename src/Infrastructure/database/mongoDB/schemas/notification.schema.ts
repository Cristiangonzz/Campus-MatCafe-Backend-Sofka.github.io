import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({
  versionKey: false,
})
export class Notification {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: String, required: true })
  repo: string;

  @Prop({ type: String })
  course: string;

  @Prop({ type: String })
  coment: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
