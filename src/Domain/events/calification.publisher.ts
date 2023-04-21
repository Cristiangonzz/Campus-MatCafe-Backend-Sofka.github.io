import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class CalificationEventPublisher {
  constructor(@Inject('RECIPE_SERVICE2') private readonly proxy: ClientProxy) {}

  publish(id: string, data: string): Observable<string> {
    console.log(JSON.stringify({ id, data }));
    return this.proxy.emit('add.favorite', { id, data });
  }
}
