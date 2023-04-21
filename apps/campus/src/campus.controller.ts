import { Controller, Get } from '@nestjs/common';
import { CampusService } from './campus.service';

@Controller()
export class CampusController {
  constructor(private readonly campusService: CampusService) {}

  @Get()
  getHello(): string {
    return this.campusService.getHello();
  }
}
