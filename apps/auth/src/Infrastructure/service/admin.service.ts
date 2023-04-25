import { Injectable } from '@nestjs/common';
import { AdminMongoService } from '../database/mongoDB/service/admin.service';

@Injectable()
export class AdminService extends AdminMongoService {}
