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
import {
  Calification,
  CalificationSchema,
} from './schemas/calification.schema';
import {
  Notification,
  NotificationSchema,
} from './schemas/notification.schema';
import { LearnerMongoService } from './service/Learner.mongo.service';
import { AdminMongoService } from './service/admin.service';
import { CourseServiceMongo } from './service/course.mongo.service';
import { RouteServiceMongo } from './service/route.mongo.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://mongo:kpXvJKA8tKueIceEqQLg@containers-us-west-170.railway.app:5651',
      {
        autoCreate: true,
      },
    ),
    MongooseModule.forFeature([
      { name: Route.name, schema: RouteSchema },
      { name: Admin.name, schema: AdminSchema },
      { name: Learner.name, schema: LearnerSchema },
      { name: Course.name, schema: CourseSchema },
      { name: Notification.name, schema: NotificationSchema },
      { name: Calification.name, schema: CalificationSchema },
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
