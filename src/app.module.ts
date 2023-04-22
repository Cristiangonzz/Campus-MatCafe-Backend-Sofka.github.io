import { InfrastructureModule } from './Infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';
import { RouteController } from './Infrastructure/controllers/routeController';
import { CourseController } from './Infrastructure/controllers/courseController';
import { AdminController } from './Infrastructure/controllers/admin.controller';

@Module({
  imports: [InfrastructureModule],
  controllers: [RouteController, CourseController, AdminController],
  providers: [],
})
export class AppModule {}
