import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class CalificationEventPublisher {
  constructor(@Inject('CAMPUS_SERVICE') private readonly proxy: ClientProxy) {}

  publish(id: string, data: string): Observable<string> {
    console.log(JSON.stringify({ id, data }));
    return this.proxy.emit('add.favorite', { id, data });
  }
}
