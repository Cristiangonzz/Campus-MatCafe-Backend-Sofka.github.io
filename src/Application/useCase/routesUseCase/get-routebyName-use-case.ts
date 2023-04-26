import { Observable } from 'rxjs';
import { RouteEntity } from 'src/Domain/entities';
import { IRouteDomainService } from 'src/Domain/service';

export class GetRouteByNameUseCase {
  constructor(public readonly RouteDomainService: IRouteDomainService) {}

  execute(name: string): Observable<RouteEntity> {
    return this.RouteDomainService.getRouteName(name);
  }
}
