import { Injectable } from '@nestjs/common';
import { Observable, catchError, from, map, switchMap } from 'rxjs';
import { AdminDocument, Course, CourseDocument } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseEntity } from 'src/Domain/entities';
import { Admin, ObjectId } from 'mongodb';

@Injectable()
export class CourseRepository {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminRepository: Model<AdminDocument>,
    @InjectModel(Course.name)
    private readonly CourseModule: Model<CourseDocument>,
  ) {}
  createCourse(Course: CourseEntity): Observable<CourseEntity> {
    return from(this.adminRepository.findById(Course.adminId)).pipe(
      switchMap((admin: AdminDocument) => {
        if (!admin) {
          throw new Error(
            `No se encontró un administrador con el ID ${Course.adminId}`,
          );
        }

        return this.addcourseToAdmin(Course.adminId, Course.title).pipe(
          switchMap(() => {
            return from(this.CourseModule.create(Course)).pipe(
              map((doc) => doc.toJSON()),
              catchError(() => {
                throw new Error('Error al crear el curso');
              }),
            );
          }),
        );
      }),
    );
  }

  addcourseToAdmin(adminId, courseTitle): Observable<string> {
    return from(
      this.adminRepository.findByIdAndUpdate(
        adminId,
        { $addToSet: { course: courseTitle } },
        { new: true },
      ),
    ).pipe(
      map((updatedAdmin: AdminDocument) => {
        if (updatedAdmin.route.includes(courseTitle)) {
          return `El título del curso  '${courseTitle}' ya existe en el administrador con ID ${adminId}`;
        }
      }),
      catchError((error) => {
        console.error(
          'Error al actualizar las rutas del administrador:',
          error,
        );
        throw new Error('Error al actualizar las rutas del administrador');
      }),
    );
  }

  updateCourse(id: string, Course: CourseEntity): Observable<CourseEntity> {
    const objectid = new ObjectId(id);
    return from(
      this.CourseModule.findOneAndUpdate(
        { _id: objectid },
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
    const objectid = new ObjectId(CourseId);
    return from(this.CourseModule.deleteOne({ _id: objectid }).exec()).pipe(
      map((result) => result.deletedCount > 0),
    );
  }

  getCourse(CourseId: string): Observable<CourseEntity> {
    return from(this.CourseModule.findById(CourseId)).pipe(
      map((doc) => {
        if (!doc) {
          throw new Error('El curso  no existe');
        }
        return doc.toJSON();
      }),
      catchError(() => {
        throw new Error('Error al obtener el curso');
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
        throw new Error('no se encotron cursos ');
      }),
    );
  }
}
