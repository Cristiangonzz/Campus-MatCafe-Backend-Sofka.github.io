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

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@retofinal.sm6dqqu.mongodb.net/test',
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
  ],
  exports: [
    AdminMongoService,
    AdminRepository,
    CourseRepository,
    RouteRepository,
    CourseServiceMongo,
    RouteServiceMongo,
  ],
})
export class MongoModule {}
