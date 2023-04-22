import { RouteServiceMongo } from '../database/mongoDB/service/route.mongo.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RouteInfrastrucureService extends RouteServiceMongo {}
