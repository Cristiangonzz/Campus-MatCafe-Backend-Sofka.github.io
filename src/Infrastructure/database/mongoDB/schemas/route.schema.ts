import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type RouteDocument = Route & Document;

@Schema()
export class Route {
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
  courses: string[];

  @Prop({ required: true })
  @ApiProperty()
  adminId: string;
}

export const RouteSchema = SchemaFactory.createForClass(Route);
