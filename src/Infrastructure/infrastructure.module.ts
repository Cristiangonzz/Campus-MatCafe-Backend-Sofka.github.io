import { Module } from '@nestjs/common';
import { RouteInfrastrucureService } from './service/route.infrastructure.service';
import { MongoModule } from './database';
import { CourseInfrastrucureService } from './service/Course.infrastructure.service';
import { AdminService } from './service/admin.service';

@Module({
  imports: [MongoModule],
  controllers: [],
  providers: [
    RouteInfrastrucureService,
    CourseInfrastrucureService,
    AdminService,
  ],
  exports: [
    CourseInfrastrucureService,
    RouteInfrastrucureService,
    AdminService,
  ],
})
export class InfrastructureModule {}
