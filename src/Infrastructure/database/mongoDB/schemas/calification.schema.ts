import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CalificationDocument = Calification & Document;

@Schema({
  versionKey: false,
})
export class Calification {
  @Prop({ type: Number })
  grade?: number;

  @Prop({ type: String })
  comment?: string;

  @Prop({ type: String, required: true })
  courseId: string;
}

export const CalificationSchema = SchemaFactory.createForClass(Calification);
