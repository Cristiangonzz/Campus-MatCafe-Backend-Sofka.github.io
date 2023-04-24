import { Injectable } from '@nestjs/common';
import { CourseServiceMongo } from '../database/';
@Injectable()
export class CourseInfrastructureService extends CourseServiceMongo {}
