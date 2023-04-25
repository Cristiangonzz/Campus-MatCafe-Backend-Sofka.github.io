import { Injectable } from '@nestjs/common';
import { LearnerMongoService } from '../database/mongoDB/service/Learner.mongo.service';

@Injectable()
export class LearnerService extends LearnerMongoService {}
