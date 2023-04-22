import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminRepository } from './repository/admin.repository';
import { Admin, AdminSchema } from './schemas/admin.schema';
import { Learner, LearnerSchema } from './schemas/learner.schema';
import { AdminMongoService } from './service/admin.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@retofinal.sm6dqqu.mongodb.net/test',
      {
        autoCreate: true,
      },
    ),
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema,
      },
      {
        name: Learner.name,
        schema: LearnerSchema,
      },
    ]),
  ],

  controllers: [],
  providers: [AdminMongoService, AdminRepository],
  exports: [AdminMongoService, AdminRepository],
})
export class MongoModule {}
