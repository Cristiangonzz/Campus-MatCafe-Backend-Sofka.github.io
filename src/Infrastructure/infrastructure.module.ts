import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongoModule } from './database';
import { CalificationPublisher } from './messaging/calification.publisher';
import { NotificationPublisher } from './messaging/notification.publisher';
import { CourseInfrastructureService } from './service';
import { AdminService } from './service/admin.service';
import { LearnerService } from './service/learner.service';
import { RouteInfrastructureService } from './service/route.infrastructure.service';

@Module({
  imports: [
    MongoModule,
    ClientsModule.register([
      {
        name: 'CAMPUS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://kcbgbwco:J0FHFTAYqWX8WgpOX4F6I0Z0Ry09IH1B@porpoise.rmq.cloudamqp.com/kcbgbwco',
          ],
          queue: 'campus',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [
    RouteInfrastructureService,
    CourseInfrastructureService,
    AdminService,
    NotificationPublisher,
    CalificationPublisher,
    LearnerService,
  ],
  exports: [
    CourseInfrastructureService,
    RouteInfrastructureService,
    CalificationPublisher,
    LearnerService,
    AdminService,
    NotificationPublisher,
    LearnerService,
  ],
})
export class InfrastructureModule {}
