import { Module } from '@nestjs/common';
import { MongoModule } from './Infrastructure';
import { AdminController } from './Infrastructure/controllers/admin.controller';
import { AdminService } from './Infrastructure/service/admin.service';

@Module({
  imports: [MongoModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AppModule {}
