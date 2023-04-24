import { Observable } from 'rxjs';
import { IAdminDomainService } from 'src/Domain/service/admin.service';
import { IUseCase } from '../interface/use-case.interface';
import {
  CreateAdminUseCase,
  CreateLearnerUseCase,
  GetAdminByEmailUseCase,
  GetLearnerByEmailUseCase,
  UpdateAdminUseCase,
  UpdateLearnerUseCase,
} from '../useCase/admin';
import { GradeStudentUseCase } from '../useCase/admin/grade-student.use-case';

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
