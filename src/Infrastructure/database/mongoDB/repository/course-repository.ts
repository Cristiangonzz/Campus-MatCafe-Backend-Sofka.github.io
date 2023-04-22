import { Injectable } from '@nestjs/common';
import { Observable, catchError, from, map } from 'rxjs';
import { CourseEntity } from '../../../../Domain';
import { Course, CourseDocument } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class CourseRepository {
  constructor(
    @InjectModel(Course.name)
    private readonly CourseModule: Model<CourseDocument>,
  ) {}
  createCourse(Course: CourseEntity): Observable<CourseEntity> {
    return from(this.CourseModule.create(Course)).pipe(
      map((doc) => doc.toJSON()),
      catchError((error) => {
        console.error('Error al crear la ruta:', error);
        throw new Error('Error al crear la ruta');
      }),
    );
  }

  updateCourse(id: string, Course: CourseEntity): Observable<CourseEntity> {
    const objectId = new ObjectId(id);
    return from(
      this.CourseModule.findOneAndUpdate(
        { _id: objectId },
        { $set: Course },
        { new: true },
      ).exec(),
    ).pipe(
      map((doc) => {
        const { adminId, description, duration, title, requirements, content } =
          doc;
        return new CourseEntity(
          title,
          description,
          duration,
          requirements,
          content,
          adminId,
        );
      }),
    );
  }

  deleteCourse(CourseId: string): Observable<boolean> {
    const objectId = new ObjectId(CourseId);
    return from(this.CourseModule.deleteOne({ _id: objectId }).exec()).pipe(
      map((result) => result.deletedCount > 0),
    );
  }

  getCourse(CourseId: string): Observable<CourseEntity> {
    return from(this.CourseModule.findById(CourseId)).pipe(
      map((doc) => doc?.toJSON()),
      catchError((error) => {
        console.error('Error al obtener la ruta:', error);
        throw new Error('Error al obtener la ruta');
      }),
    );
  }

  getAllCourses(): Observable<CourseEntity[]> {
    return from(this.CourseModule.find().exec()).pipe(
      map((CourseDocuments: CourseDocument[]) => {
        const Course = CourseDocuments.map((CourseDocuments) => {
          const courseEntity = new CourseEntity();
          courseEntity.adminId = CourseDocuments.adminId;
          courseEntity.description = CourseDocuments.description;
          courseEntity.duration = CourseDocuments.duration;
          courseEntity.title = CourseDocuments.title;
          courseEntity.content = CourseDocuments.content;
          courseEntity.requirements = CourseDocuments.requirements;
          return courseEntity;
        });
        return Course;
      }),
      catchError(() => {
        throw new Error('Error find user');
      }),
    );
  }
}
