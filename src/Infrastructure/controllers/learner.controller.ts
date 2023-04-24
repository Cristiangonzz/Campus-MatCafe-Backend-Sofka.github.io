import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
  @Post('sendWorkshop')
  sendWorkshop(@Body() sendWorkshop: SendWorkshopDto): Observable<string> {
    return this.learnerService.sendWorkshop(
      sendWorkshop.learnedId,
      sendWorkshop.github,
      sendWorkshop.courseid,
    );
  }
  @Post('subscribeRoute')
  subscribeRoute(
    @Body() subscribeRoute: SubscribeRouteDto,
  ): Observable<string> {
    return this.learnerService.subscribeRoute(
      subscribeRoute.learnedId,
      subscribeRoute.routeid,
    );
  }
}
