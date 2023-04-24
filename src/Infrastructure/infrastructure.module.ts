import { Module } from '@nestjs/common';
import { MongoModule } from './database';
import { AdminService } from './service/admin.service';
import { RouteInfrastrucureService } from './service/route.infrastructure.service';
import { CourseInfrastrucureService } from './service';
import { LearnerService } from './service/learner.service';

@Module({
  imports: [MongoModule],
  controllers: [],
  providers: [
    RouteInfrastrucureService,
    CourseInfrastrucureService,
    AdminService,
    LearnerService,
  ],
  exports: [
    CourseInfrastrucureService,
    RouteInfrastrucureService,
    AdminService,
    LearnerService,
  ],
})
export class InfrastructureModule {}
