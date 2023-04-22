import { Observable } from 'rxjs';
import { RouteEntity } from '../../../Domain/entities/route.entity';
import { IRouteDomainService } from '../../../Domain/service/route.service';

export class CreateRouteUseCase {
  constructor(public readonly RouteDomainService: IRouteDomainService) {}

  execute(Route: RouteEntity): Observable<RouteEntity> {
    return this.RouteDomainService.createRoute(Route);
  }
}
