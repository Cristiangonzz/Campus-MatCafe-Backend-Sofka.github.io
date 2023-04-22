import { Observable } from 'rxjs';
import { RouteEntity } from '../../../Domain/entities/route.entity';
import { IRouteDomainService } from '../../../Domain/service/route.service';

export class GetRouteByIdUseCase {
  constructor(public readonly RouteDomainService: IRouteDomainService) {}

  execute(id: string): Observable<RouteEntity> {
    return this.RouteDomainService.getRoute(id);
  }
}
