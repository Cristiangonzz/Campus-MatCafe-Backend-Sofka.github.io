import { RouteController } from './Infrastructure/controllers/routeController';
import { Module } from '@nestjs/common';

import { CourseController, InfrastructureModule } from './Infrastructure';
import { AdminController } from './Infrastructure/controllers/admin.controller';

@Module({
  imports: [InfrastructureModule],
  controllers: [AdminController, RouteController, CourseController],
  providers: [],
})
export class AppModule {}
