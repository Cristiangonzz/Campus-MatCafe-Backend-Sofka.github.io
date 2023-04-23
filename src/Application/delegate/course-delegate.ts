import { ICourseDomainService } from 'src/Domain/service';
import { IUseCase } from '../interface/use-case.interface';
import {
  CreatecourseUseCase,
  DeletecourseUseCase,
  GetAllCourseUseCase,
  GetCourseUseCase,
  UpdateCourseUseCase,
} from '../useCase';
import { Observable } from 'rxjs';

export class CourseDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(private readonly courseService: ICourseDomainService) {}

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toDeletecourse(): void {
    this.delegate = new DeletecourseUseCase(this.courseService);
  }

  toCreatecourse(): void {
    this.delegate = new CreatecourseUseCase(this.courseService);
  }

  findById(): void {
    this.delegate = new GetCourseUseCase(this.courseService);
  }

  updatecourse(): void {
    this.delegate = new UpdateCourseUseCase(this.courseService);
  }

  getAllCourse(): void {
    this.delegate = new GetAllCourseUseCase(this.courseService);
  }
}
