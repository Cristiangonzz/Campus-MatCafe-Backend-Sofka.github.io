import { Body, Controller, Post } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { LearnerDelegate } from 'src/Application/delegate/learner.delegate';
import { CalificationEntity } from 'src/Domain/entities';
import { NotificationPublisher } from '../messaging/notification.publisher';
import { LearnerService } from '../service/learner.service';
import { SendWorkshopDto } from '../utils/DTO/sendWorkshop.dto';
import { SubscribeRouteDto } from '../utils/DTO/subscribeRoute.dto';

@ApiTags('Learner')
@Controller('learner')
export class LearnerController {
  private delegate: LearnerDelegate;
  constructor(
    private readonly learnerService: LearnerService,
    private readonly publisher: NotificationPublisher,
  ) {
    this.delegate = new LearnerDelegate(learnerService, publisher);
  }
  @ApiOperation({ summary: 'send workshop' })
  @Post('sendWorkshop')
  sendWorkshop(@Body() sendWorkshop: SendWorkshopDto): Observable<string> {
    this.delegate.toSendWorkshop();

    return this.delegate.execute(
      sendWorkshop.learnedId,
      sendWorkshop.github,
      sendWorkshop.courseid,
      sendWorkshop.coment,
    );
  }
  @ApiOperation({ summary: 'subscribe route' })
  @Post('subscribeRoute')
  subscribeRoute(
    @Body() subscribeRoute: SubscribeRouteDto,
  ): Observable<string> {
    this.delegate.toSubscribeRoute();

    return this.delegate.execute(
      subscribeRoute.learnedId,
      subscribeRoute.routeid,
    );
  }

  @EventPattern('campus.calification')
  calification(@Payload() data: string): Observable<string> {
    console.log('calification', data);
    const calification: {
      id: string;
      data: {
        learnerId: string;
        comment: string;
        courseId: string;
        grade: number;
      };
    } = JSON.parse(data);

    const califi = new CalificationEntity(
      calification.data.courseId,
      calification.data.grade,
      calification.data.comment,
    );

    this.delegate.toSaveCalification();
    return this.delegate.execute(califi);
  }
}
