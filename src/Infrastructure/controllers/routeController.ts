import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RouteEntity } from 'src/Domain/entities';
import { RouteDelegate } from '../../Application';
import { UpdateRouteDto } from '../utils/DTO/UpdateRoute.dto';
import { RegisterRouteDto } from '../utils/DTO/RegisterRoute.dto';
import { RouteInfrastrucureService } from '../service/route.infrastructure.service';

@Controller('Route')
export class RouteController {
  private readonly useCase: RouteDelegate;

  constructor(private readonly routeService: RouteInfrastrucureService) {
    this.useCase = new RouteDelegate(this.routeService);
  }

  @Post()
  createRoute(@Body() route: RegisterRouteDto): Observable<RouteEntity> {
    return this.routeService.createRoute(route);
  }

  @Put(':id')
  updateRoute(
    @Param('id') id: string,
    @Body() route: UpdateRouteDto,
  ): Observable<RouteEntity> {
    this.useCase.updateRoute();
    return this.useCase.execute(id, route);
  }

  @Delete(':id')
  deleteRoute(@Param('id') id: string): Observable<boolean> {
    this.useCase.toDeleteRoute();
    return this.useCase.execute(id);
  }

  @Get(':id')
  getRoute(@Param('id') id: string): Observable<RouteEntity> {
    this.useCase.findById();
    return this.useCase.execute(id);
  }

  @Get()
  getAllRoutes(): Observable<RouteEntity[]> {
    this.useCase.getAllRoute();
    return this.useCase.execute();
  }
}
