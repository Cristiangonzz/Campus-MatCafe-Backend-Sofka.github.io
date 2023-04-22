import { Observable } from 'rxjs';
import { IRouteDomainService } from '../../../Domain/service/route.service';

export class DeleteRouteUseCase {
  constructor(public readonly RouteDomainService: IRouteDomainService) {}

  execute(id: string): Observable<boolean> {
    return this.RouteDomainService.deleteRoute(id);
  }
}
