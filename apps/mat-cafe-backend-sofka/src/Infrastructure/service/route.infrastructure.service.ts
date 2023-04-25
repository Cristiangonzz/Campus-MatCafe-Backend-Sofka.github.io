import { Injectable } from '@nestjs/common';
import { RouteServiceMongo } from '../database/mongoDB/service/route.mongo.service';

@Injectable()
export class RouteInfrastructureService extends RouteServiceMongo {}
