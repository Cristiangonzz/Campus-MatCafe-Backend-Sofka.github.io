import { Observable } from 'rxjs';
import { IUseCase } from '../..';
import { AdminEntity } from 'src/Domain/entities/admin.entity';
import { IAdminDomainService } from 'src/Domain/service/admin.service';

export class GetAdminByEmailUseCase implements IUseCase {
  constructor(private readonly service: IAdminDomainService) {}

  execute(email: string): Observable<AdminEntity> {
    return this.service.getAdminByEmail(email);
  }
}
