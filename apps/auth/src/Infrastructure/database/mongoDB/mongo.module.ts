import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminRepository } from './repository/admin.repository';
import { CourseRepository } from './repository/course-repository';
import { LearnerRepository } from './repository/learner.repository';
import { RouteRepository } from './repository/route-repository';
import {
  Admin,
  AdminSchema,
  Course,
  CourseSchema,
  Learner,
  LearnerSchema,
  Route,
  RouteSchema,
} from './schemas';
import { AdminMongoService } from './service/admin.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://mongo:i19yCGFumWjF0xDU0ivg@containers-us-west-140.railway.app:7798',
      {
        autoCreate: true,
      },
    ),
    MongooseModule.forFeature([
      { name: Route.name, schema: RouteSchema },
      { name: Admin.name, schema: AdminSchema },
      { name: Learner.name, schema: LearnerSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
  ],

  controllers: [],
  providers: [
    AdminMongoService,
    AdminRepository,
    CourseRepository,
    RouteRepository,
    LearnerRepository,
  ],
  exports: [
    AdminMongoService,
    AdminRepository,
    CourseRepository,
    RouteRepository,
    LearnerRepository,
  ],
})
export class MongoModule {}
