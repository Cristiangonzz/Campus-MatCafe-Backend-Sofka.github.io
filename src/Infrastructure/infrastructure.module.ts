import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongoModule } from './database';
import { CalificationPublisher } from './messaging/calification.publisher';
import { AdminService } from './service/admin.service';
import { RouteInfrastrucureService } from './service/route.infrastructure.service';
import { CourseInfrastrucureService } from './service';
import { LearnerService } from './service/learner.service';

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
    RouteInfrastrucureService,
    CourseInfrastrucureService,
    AdminService,
    CalificationPublisher,
    LearnerService,
  ],
  exports: [
    CourseInfrastrucureService,
    RouteInfrastrucureService,
    AdminService,
    CalificationPublisher,
    LearnerService,
  ],
})
export class InfrastructureModule {}
