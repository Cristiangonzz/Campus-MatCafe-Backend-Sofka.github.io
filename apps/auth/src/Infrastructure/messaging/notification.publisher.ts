import { Injectable } from '@nestjs/common';
import { NotificationEventPublisher } from '../../Domain/events';

@Injectable()
export class NotificationPublisher extends NotificationEventPublisher {}
