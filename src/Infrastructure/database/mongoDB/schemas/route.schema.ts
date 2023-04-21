import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Course, CourseSchema } from './course.schema';

export type RouteDocument = Route & Document;

@Schema()
export class Route {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ type: [CourseSchema], required: true })
  courses: Course[];

  @Prop({ required: true })
  adminId: string;
}

export const RouteSchema = SchemaFactory.createForClass(Route);
