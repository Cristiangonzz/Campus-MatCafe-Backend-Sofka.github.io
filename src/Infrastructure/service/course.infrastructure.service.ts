import { Injectable } from '@nestjs/common';
import { CourseServiceMongo } from '../database/mongoDB/service/course.mongo.service';
@Injectable()
export class CourseInfrastrucureService extends CourseServiceMongo {}
