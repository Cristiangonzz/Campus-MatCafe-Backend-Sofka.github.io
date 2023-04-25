import { Injectable } from '@nestjs/common';
import { CalificationEventPublisher } from '../../Domain/events';

@Injectable()
export class CalificationPublisher extends CalificationEventPublisher {}
