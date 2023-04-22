import { Observable } from 'rxjs';
import { RouteEntity } from '../../../Domain/entities/route.entity';
import { IRouteDomainService } from '../../../Domain/service/route.service';

export class UpdateRouteUseCase {
  constructor(public readonly RouteDomainService: IRouteDomainService) {}

  execute(Id: string, Route: RouteEntity): Observable<RouteEntity> {
    return this.RouteDomainService.updateRoute(Id, Route);
  }
}
