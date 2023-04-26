import { Module } from '@nestjs/common';
import { RouteController } from './Infrastructure/controllers/routeController';

import { APP_FILTER } from '@nestjs/core';
import { InfrastructureModule } from './Infrastructure';
import { AdminController } from './Infrastructure/controllers/admin.controller';
import { CourseController } from './Infrastructure/controllers/courseController';
import { LearnerController } from './Infrastructure/controllers/learner.controller';
import { MongoServerErrorExceptionFilter } from './Infrastructure/utils/exception-filters';
import { ErrorExceptionFilter } from './Infrastructure/utils/exception-filters/error.exception-filter';

@Module({
  imports: [InfrastructureModule],
  controllers: [
    AdminController,
    RouteController,
    CourseController,
    LearnerController,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: MongoServerErrorExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorExceptionFilter,
    },
  ],
})
export class AppModule {}
