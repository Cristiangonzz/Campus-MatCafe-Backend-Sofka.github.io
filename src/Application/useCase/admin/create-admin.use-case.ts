import { Observable } from 'rxjs';
import { AdminEntity } from '../../../Domain/entities/admin.entity';
import { IAdminDomainService } from '../../../Domain/service/admin.service';
import { IUseCase } from '../..';
export class CreateAdminUseCase implements IUseCase {
  constructor(private readonly service: IAdminDomainService) {}
  execute(admin: AdminEntity): Observable<AdminEntity> {
    return this.service.createAdmin(admin);
  }
}
