import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Course, CourseSchema } from './course.schema';
import { ApiProperty } from '@nestjs/swagger';

export type RouteDocument = Route & Document;

@Schema()
export class Route {
  @Prop({ required: true })
  @ApiProperty()
  title: string;

  @Prop({ required: true })
  @ApiProperty()
  description: string;

  @Prop({ required: true })
  @ApiProperty()
  duration: string;

  @Prop({ type: [CourseSchema], required: true })
  @ApiProperty()
  courses: Course[];

  @Prop({ required: true })
  @ApiProperty()
  adminId: string;
}

export const RouteSchema = SchemaFactory.createForClass(Route);
