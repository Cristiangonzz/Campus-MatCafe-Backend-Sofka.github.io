import { Observable } from 'rxjs';
import { ICourseDomainService } from 'src/Domain/service';
import { IUseCase } from '../interface/use-case.interface';
import {
  CreateCourseUseCase,
  DeleteCourseUseCase,
  GetAllCourseUseCase,
  GetCourseUseCase,
  UpdateCourseUseCase,
} from '../useCase';
import { GetCourseByNameUseCase } from '../useCase/courseUseCase/getCourse-byName-use-case';

export class CourseDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(private readonly courseService: ICourseDomainService) {}

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toDeleteCourse(): void {
    this.delegate = new DeleteCourseUseCase(this.courseService);
  }

  toCreateCourse(): void {
    this.delegate = new CreateCourseUseCase(this.courseService);
  }

  findById(): void {
    this.delegate = new GetCourseUseCase(this.courseService);
  }

  updateCourse(): void {
    this.delegate = new UpdateCourseUseCase(this.courseService);
  }

  getAllCourse(): void {
    this.delegate = new GetAllCourseUseCase(this.courseService);
  }

  toGetCourseByName(): void {
    this.delegate = new GetCourseByNameUseCase(this.courseService);
  }
}
