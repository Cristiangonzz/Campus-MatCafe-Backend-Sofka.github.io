import { Injectable } from '@nestjs/common';

@Injectable()
export class CampusService {
  getHello(): string {
    return 'Hello World!';
  }
}
