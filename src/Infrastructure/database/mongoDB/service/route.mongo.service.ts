import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RouteEntity } from '../../../../Domain/entities/route.entity';
import { IRouteDomainService } from '../../../../Domain/service/route.service';
import { RouteRepository } from '../repository/route-repository';

@Injectable()
export class RouteServiceMongo implements IRouteDomainService {
  constructor(private readonly repository: RouteRepository) {}
  getRouteName(Name: string): Observable<RouteEntity> {
    return this.repository.getRouteByName(Name);
  }

  createRoute(Route: RouteEntity): Observable<RouteEntity> {
    return this.repository.createRoute(Route);
  }
  updateRoute(id: string, Route: RouteEntity): Observable<RouteEntity> {
    return this.repository.updateRoute(id, Route);
  }
  deleteRoute(RouteId: string): Observable<boolean> {
    return this.repository.deleteRoute(RouteId);
  }
  getRoute(RouteId: string): Observable<RouteEntity> {
    return this.repository.getRoute(RouteId);
  }
  getAllRoutes(): Observable<RouteEntity[]> {
    return this.repository.getAllRoutes();
  }
}
