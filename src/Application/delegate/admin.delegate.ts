import { Observable } from 'rxjs';
import { IAdminDomainService } from 'src/Domain/service/admin.service';
import { IUseCase } from '../interface/use-case.interface';
import { CreateAdminUseCase } from '../use-case/admin/create-admin.use-case';
import { CreateLearnerUseCase } from '../use-case/admin/create-learner.use-case';
import { GetAdminByEmailUseCase } from '../use-case/admin/get-admin.use-case';
import { GetLearnerByEmailUseCase } from '../use-case/admin/get-learner.use-case';
import { UpdateAdminUseCase } from '../use-case/admin/update-admin.use-case';
import { UpdateLearnerUseCase } from '../use-case/admin/update-learner.use-case';
import { GradeStudentUseCase } from '../use-case/admin/grade-student.use-case';


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
