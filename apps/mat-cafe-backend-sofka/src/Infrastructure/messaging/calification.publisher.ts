import { Injectable } from '@nestjs/common';
import { CalificationEventPublisher } from 'src/Domain/events';

@Injectable()
export class CalificationPublisher extends CalificationEventPublisher {}
