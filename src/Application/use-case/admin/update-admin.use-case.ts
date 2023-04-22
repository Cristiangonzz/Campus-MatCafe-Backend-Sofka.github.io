import { Observable } from 'rxjs';
import { AdminEntity } from '../../../Domain/entities/admin.entity';
import { IAdminDomainService } from '../../../Domain/service/admin.service';
import { IUseCase } from '../../interface/use-case.interface';

export class UpdateAdminUseCase implements IUseCase {
  constructor(private readonly service: IAdminDomainService) {}

  execute(email: string, admin: AdminEntity): Observable<AdminEntity> {
    return this.service.updateAdmin(email, admin);
  }
}
