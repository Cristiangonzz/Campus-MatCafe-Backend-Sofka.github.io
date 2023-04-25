import { Injectable } from '@nestjs/common';
import { NotificationEventPublisher } from 'src/Domain/events';

@Injectable()
export class NotificationPublisher extends NotificationEventPublisher {}
