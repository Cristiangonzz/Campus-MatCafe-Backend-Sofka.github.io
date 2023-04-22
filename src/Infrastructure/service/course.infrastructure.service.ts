import { Injectable } from '@nestjs/common';
import { CourseServiceMongo } from '../database/';
@Injectable()
export class CourseInfrastrucureService extends CourseServiceMongo {}
