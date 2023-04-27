import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ required: true, unique: true })
  @ApiProperty()
  title: string;

  @Prop({ required: true })
  @ApiProperty()
  description: string;

  @Prop({ required: true })
  @ApiProperty()
  duration: string;

  @Prop({ required: true })
  @ApiProperty()
  requirements: string;

  @Prop({ required: true })
  @ApiProperty()
  content: string[];

  @Prop({ required: true })
  @ApiProperty()
  adminId: string;
  @Prop()
  @ApiProperty()
  url?: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
