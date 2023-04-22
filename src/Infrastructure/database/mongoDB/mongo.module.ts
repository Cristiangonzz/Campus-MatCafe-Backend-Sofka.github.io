import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { MongooseModule } from '@nestjs/mongoose';
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
  providers: [],
  exports: [
    MongooseModule.forFeature([
      { name: Route.name, schema: RouteSchema },
      { name: Admin.name, schema: AdminSchema },
      { name: Learner.name, schema: LearnerSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
  ],
})
export class MongoModule {}
