import { Observable } from 'rxjs';
import { IAdminDomainService } from 'src/Domain/service/admin.service';
import { IUseCase } from '../interface/use-case.interface';

import { CreateAdminUseCase } from '../useCase/admin/create-admin.use-case';
import { GetAdminByEmailUseCase } from '../useCase/admin/get-admin.use-case';
import { GradeStudentUseCase } from '../useCase/admin/grade-student.use-case';
import { UpdateAdminUseCase } from '../useCase/admin/update-admin.use-case';
import { CreateLearnerUseCase } from '../useCase/admin/create-learner.use-case';
import { GetLearnerByEmailUseCase } from '../useCase/admin/get-learner.use-case';
import { UpdateLearnerUseCase } from '../useCase/admin/update-learner.use-case';

export class AdminDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(private readonly service: IAdminDomainService) {}

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toCreateAdmin(): void {
    this.delegate = new CreateAdminUseCase(this.service);
  }

  toCreateLearner(): void {
    this.delegate = new CreateLearnerUseCase(this.service);
  }

  toGetAdminByEmail(): void {
    this.delegate = new GetAdminByEmailUseCase(this.service);
  }

  toGetLernerByEmail(): void {
    this.delegate = new GetLearnerByEmailUseCase(this.service);
  }

  toUpdateAdmin(): void {
    this.delegate = new UpdateAdminUseCase(this.service);
  }

  toUpdateLearner(): void {
    this.delegate = new UpdateLearnerUseCase(this.service);
  }

  toGradeStudent(): void {
    this.delegate = new GradeStudentUseCase(this.service);
  }
}
