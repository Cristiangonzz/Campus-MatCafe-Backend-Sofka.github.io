import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CourseDelegate } from '../../Application';
import { CourseEntity } from '../../Domain/entities/course.entity';
import { CourseInfrastrucureService } from '../service/Course.infrastructure.service';
import { RegisterCourseDto } from '../utils/DTO/RegisterCourse.dto';
import { UpdateCourseDto } from '../utils/DTO/UpdateCourse.dto';

@Controller('Course')
export class CourseController {
  private readonly useCase: CourseDelegate;

  constructor(private readonly CourseService: CourseInfrastrucureService) {
    this.useCase = new CourseDelegate(this.CourseService);
  }

  @Post()
  createCourse(@Body() Course: RegisterCourseDto): Observable<CourseEntity> {
    return this.CourseService.createCourse(Course);
  }

  @Put(':id')
  updateCourse(
    @Param('id') id: string,
    @Body() Course: UpdateCourseDto,
  ): Observable<CourseEntity> {
    this.useCase.updatecourse();
    return this.useCase.execute(id, Course);
  }

  @Delete(':id')
  deleteCourse(@Param('id') id: string): Observable<boolean> {
    this.useCase.toDeletecourse();
    return this.useCase.execute(id);
  }

  @Get(':id')
  getCourse(@Param('id') id: string): Observable<CourseEntity> {
    this.useCase.findById();
    return this.useCase.execute(id);
  }

  @Get()
  getAllCourses(): Observable<CourseEntity[]> {
    this.useCase.getAllCourse();
    return this.useCase.execute();
  }
}
