import { Observable } from 'rxjs';
import { IRouteDomainService } from '../../../Domain/service/route.service';
import { RouteEntity } from '../../../Domain/entities/route.entity';

export class GetAllRouteUseCase {
  constructor(public readonly RouteDomainService: IRouteDomainService) {}

  execute(): Observable<RouteEntity[]> {
    return this.RouteDomainService.getAllRoutes();
  }
}
