import { IRouteDomainService } from 'src/Domain/service';
import { IUseCase } from '../interface/use-case.interface';
import {
  CreateRouteUseCase,
  DeleteRouteUseCase,
  GetAllRouteUseCase,
  GetRouteByIdUseCase,
  UpdateRouteUseCase,
} from '../useCase';
import { Observable } from 'rxjs';
import { GetRouteByNameUseCase } from '../useCase/routesUseCase/get-routebyName-use-case';

export class RouteDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(private readonly RouteService: IRouteDomainService) {}

  
  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toDeleteRoute(): void {
    this.delegate = new DeleteRouteUseCase(this.RouteService);
  }

  toCreateRoute(): void {
    this.delegate = new CreateRouteUseCase(this.RouteService);
  }

  findById(): void {
    this.delegate = new GetRouteByIdUseCase(this.RouteService);
  }

  updateRoute(): void {
    this.delegate = new UpdateRouteUseCase(this.RouteService);
  }

  getAllRoute(): void {
    this.delegate = new GetAllRouteUseCase(this.RouteService);
  }

  toGetRouteByName(): void {
    this.delegate = new GetRouteByNameUseCase(this.RouteService);
  }
}
