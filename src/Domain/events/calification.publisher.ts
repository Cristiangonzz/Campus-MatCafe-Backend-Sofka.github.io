import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class CalificationEventPublisher {
  constructor(@Inject('CAMPUS_SERVICE') private readonly proxy: ClientProxy) {}

  publish(
    id: string,
    data: {
      learnerId: string;
      comment: string;
      courseId: string;
      grade: number;
    },
  ): Observable<string> {
    return this.proxy.emit('campus.calification', JSON.stringify({ id, data }));
  }
}
