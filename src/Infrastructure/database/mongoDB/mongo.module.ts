import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminRepository } from './repository/admin.repository';
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
import { CourseRepository } from './repository/course-repository';
import { RouteRepository } from './repository/route-repository';
import { CourseServiceMongo } from './service/course.mongo.service';
import { RouteServiceMongo } from './service/route.mongo.service';
import { LearnerMongoService } from './service/Learner.mongo.service';
import { LearnerRepository } from './repository/learner.repository';

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
    CourseServiceMongo,
    RouteServiceMongo,
    LearnerMongoService,
    LearnerRepository,
  ],
  exports: [
    AdminMongoService,
    AdminRepository,
    CourseRepository,
    RouteRepository,
    CourseServiceMongo,
    RouteServiceMongo,
    LearnerMongoService,
    LearnerRepository,
  ],
})
export class MongoModule {}
