import { Module } from '@nestjs/common';
import { AdminController } from './Infrastructure/controllers/admin.controller';
import { AdminService } from './Infrastructure/service/admin.service';

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AppModule {}
