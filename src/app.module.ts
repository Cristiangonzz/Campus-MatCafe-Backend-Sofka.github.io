import { Module } from '@nestjs/common';
import { RouteController } from './Infrastructure/controllers/routeController';
import { IRouteRepository } from './Infrastructure/database/mongoDB/repository/route-repository';
import { MongoModule } from './Infrastructure';

@Module({
  imports: [MongoModule],
  controllers: [RouteController],
  providers: [IRouteRepository],
})
export class AppModule {}
