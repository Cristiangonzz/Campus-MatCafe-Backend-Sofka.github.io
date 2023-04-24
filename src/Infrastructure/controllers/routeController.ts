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
import { RouteDelegate } from '../../Application';
import { RouteEntity } from '../../Domain/entities/route.entity';
import { RouteInfrastrucureService } from '../service/route.infrastructure.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterRouteDto, UpdateRouteDto } from '../utils';

@ApiTags('route')
@Controller('Route')
export class RouteController {
  private readonly useCase: RouteDelegate;

  constructor(private readonly routeService: RouteInfrastrucureService) {
    this.useCase = new RouteDelegate(this.routeService);
  }
  @ApiOperation({ summary: 'create  route' })
  @Post()
  createRoute(@Body() route: RegisterRouteDto): Observable<RouteEntity> {
    return this.routeService.createRoute(route);
  }
  @ApiOperation({ summary: 'uptdate  route' })
  @Put(':id')
  updateRoute(
    @Param('id') id: string,
    @Body() route: UpdateRouteDto,
  ): Observable<RouteEntity> {
    this.useCase.updateRoute();
    return this.useCase.execute(id, route);
  }
  @ApiOperation({ summary: 'delete route' })
  @Delete(':id')
  deleteRoute(@Param('id') id: string): Observable<boolean> {
    this.useCase.toDeleteRoute();
    return this.useCase.execute(id);
  }
  @ApiOperation({ summary: 'get one route' })
  @Get(':id')
  getRoute(@Param('id') id: string): Observable<RouteEntity> {
    this.useCase.findById();
    return this.useCase.execute(id);
  }
  @ApiOperation({ summary: 'get all course' })
  @Get()
  getAllRoutes(): Observable<RouteEntity[]> {
    this.useCase.getAllRoute();
    return this.useCase.execute();
  }
}
