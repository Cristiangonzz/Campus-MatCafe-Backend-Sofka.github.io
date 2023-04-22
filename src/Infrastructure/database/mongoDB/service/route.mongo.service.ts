import { Injectable } from '@nestjs/common';
import { IRouteDomainService, RouteEntity } from '../../../../Domain';
import { Observable } from 'rxjs';
import { RouteRepository } from '../repository/route-repository';

@Injectable()
export class RouteServiceMongo implements IRouteDomainService {
  constructor(private readonly repositori: RouteRepository) {}

  createRoute(Route: RouteEntity): Observable<RouteEntity> {
    return this.repositori.createRoute(Route);
  }
  updateRoute(id: string, Route: RouteEntity): Observable<RouteEntity> {
    return this.repositori.updateRoute(id, Route);
  }
  deleteRoute(RouteId: string): Observable<boolean> {
    return this.repositori.deleteRoute(RouteId);
  }
  getRoute(RouteId: string): Observable<RouteEntity> {
    return this.repositori.getRoute(RouteId);
  }
  getAllRoutes(): Observable<RouteEntity[]> {
    return this.repositori.getAllRoutes();
  }
}
