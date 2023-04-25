import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class NotificationEventPublisher {
  constructor(@Inject('CAMPUS_SERVICE') private readonly proxy: ClientProxy) {}

  publish(
    id: string,
    data: {
      id: string;
      github: string;
      learnedId: string;
      comment: string;
    },
  ): Observable<string> {
    return this.proxy.emit('campus.notification', JSON.stringify({ id, data }));
  }
}
