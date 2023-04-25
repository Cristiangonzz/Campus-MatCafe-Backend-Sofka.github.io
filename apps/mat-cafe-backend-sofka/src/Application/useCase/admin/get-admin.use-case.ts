import { Observable } from 'rxjs';
import { AdminEntity } from 'src/Domain/entities/admin.entity';
import { IAdminDomainService } from 'src/Domain/service/admin.service';
import { IUseCase } from '../../interface/use-case.interface';

export class GetAdminByEmailUseCase implements IUseCase {
  constructor(private readonly service: IAdminDomainService) {}

  execute(email: string): Observable<AdminEntity> {
    return this.service.getAdminByEmail(email);
  }
}
