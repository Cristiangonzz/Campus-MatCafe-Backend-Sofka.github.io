import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LearnerDelegate } from 'src/Application/delegate/learner.delegate';
import { LearnerService } from '../service/learner.service';
import { Observable } from 'rxjs';
import { SendWorkshopDto } from '../utils/DTO/sendWorkshop.dto';
import { SubscribeRouteDto } from '../utils/DTO/subscribeRoute.dto';

@ApiTags('Learner')
@Controller('learner')
export class LearnerController {
  private delegate: LearnerDelegate;
  constructor(private readonly learnerService: LearnerService) {
    this.delegate = new LearnerDelegate(learnerService);
  }
  @ApiOperation({ summary: 'send workshop' })
  @Post('sendWorkshop')
  sendWorkshop(@Body() sendWorkshop: SendWorkshopDto): Observable<string> {
    this.delegate.tosendWorkshop();

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
}
