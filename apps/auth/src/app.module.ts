import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { InfrastructureModule } from './Infrastructure';
import { AdminController } from './Infrastructure/controllers/admin.controller';
import { MongoServerErrorExceptionFilter } from './Infrastructure/utils/exception-filters';

@Module({
  imports: [InfrastructureModule],
  controllers: [AdminController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: MongoServerErrorExceptionFilter,
    },
  ],
})
export class AppModule {}
