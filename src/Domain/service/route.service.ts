import { Observable } from 'rxjs';
import { RouteEntity } from '../entities/route.entity';

export interface IRouteDomainService {
  createRoute(Route: RouteEntity): Observable<RouteEntity>;
  updateRoute(Id: string, Route: RouteEntity): Observable<RouteEntity>;
  deleteRoute(RouteId: string): Observable<boolean>;
  getRoute(RouteId: string): Observable<RouteEntity>;
  getAllRoutes(): Observable<RouteEntity[]>;
}
