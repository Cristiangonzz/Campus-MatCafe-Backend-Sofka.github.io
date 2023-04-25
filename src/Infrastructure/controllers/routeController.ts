import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { RouteDelegate } from '../../Application';
import { RouteEntity } from '../../Domain/entities/route.entity';
import { RouteInfrastructureService } from '../service/route.infrastructure.service';
import { RegisterRouteDto, UpdateRouteDto } from '../utils';

@ApiTags('route')
@Controller('Route')
export class RouteController {
  private readonly useCase: RouteDelegate;

  constructor(private readonly routeService: RouteInfrastructureService) {
    this.useCase = new RouteDelegate(this.routeService);
  }
  @ApiOperation({ summary: 'create  route' })
  @Post()
  createRoute(@Body() route: RegisterRouteDto): Observable<RouteEntity> {
    this.useCase.toCreateRoute();

    return this.useCase.execute(route);
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
