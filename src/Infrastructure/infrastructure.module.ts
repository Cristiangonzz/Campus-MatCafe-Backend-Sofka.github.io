import { Module } from '@nestjs/common';
import { MongoModule } from './database';
import { AdminService } from './service/admin.service';
import { RouteInfrastrucureService } from './service/route.infrastructure.service';
import { CourseInfrastrucureService } from './service';

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
