import { Injectable } from '@nestjs/common';
import {
  of,
  Observable,
  catchError,
  from,
  map,
  switchMap,
  tap,
  forkJoin,
} from 'rxjs';
import {
  AdminDocument,
  Course,
  CourseDocument,
  Learner,
  LearnerDocument,
  Route,
  RouteDocument,
} from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseEntity } from 'src/Domain/entities';
import { Admin, ObjectId } from 'mongodb';

@Injectable()
export class CourseRepository {
  constructor(
    @InjectModel(Learner.name)
    private readonly learnerRepository: Model<LearnerDocument>,
    @InjectModel(Admin.name)
    private readonly adminRepository: Model<AdminDocument>,
    @InjectModel(Course.name)
    private readonly CourseModule: Model<CourseDocument>,
    @InjectModel(Route.name)
    private readonly RouteModule: Model<RouteDocument>,
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
    let oldCourseTitle: string;
    let adminId: string;

    return from(
      this.CourseModule.findOne<CourseDocument>({ _id: objectid }).exec(),
    ).pipe(
      switchMap((oldCourse) => {
        if (!oldCourse) {
          throw new Error('El curso no existe');
        }
        oldCourseTitle = oldCourse.title;
        adminId = oldCourse.adminId;
        return from(
          this.CourseModule.findOneAndUpdate(
            { _id: objectid },
            { $set: Course },
            { new: true },
          ).exec(),
        );
      }),
      switchMap(() => {
        return from(this.adminRepository.findOne({ _id: adminId }).exec());
      }),
      tap((admin) => {
        const courseIndex = admin.course.indexOf(oldCourseTitle);
        if (courseIndex !== -1) {
          admin.course.splice(courseIndex, 1, Course.title);
          admin.save();
        }
      }),
      switchMap(() =>
        from(
          this.CourseModule.find(
            { title: oldCourseTitle },
            { title: 1 },
          ).exec(),
        ).pipe(
          map((routes) => routes.map((route) => route.title)),
          switchMap((routeNames) =>
            from(this.RouteModule.find({}).exec()).pipe(
              switchMap((learners) => {
                const updates$ = learners.map((learner) => {
                  routeNames.forEach((routeName) => {
                    if (learner.courses.includes(routeName)) {
                      learner.courses = learner.courses.map((route) =>
                        route === oldCourseTitle ? Course.title : route,
                      );
                    }
                  });
                  return from(learner.save());
                });
                return forkJoin(updates$);
              }),
              switchMap(() =>
                this.RouteModule.updateMany(
                  { courses: oldCourseTitle },
                  { $set: { 'courses.$': Course.title } },
                ).exec(),
              ),
            ),
          ),
        ),
      ),
      switchMap(() =>
        from(
          this.CourseModule.findOneAndUpdate(
            { _id: objectid },
            { $set: Course },
            { new: true },
          ).exec(),
        ),
      ),
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
      catchError((error) => {
        if (error.message.includes('Cast to ObjectId failed')) {
          throw new Error('El curso no existe');
        }
        throw error;
      }),
    );
  }

  deleteCourse(CourseId: string): Observable<boolean> {
    const objectid = new ObjectId(CourseId);
    let adminId: string;
    let courseName: string;

    return from(this.CourseModule.findOne({ _id: objectid }).exec()).pipe(
      tap((course) => {
        adminId = course.adminId;
        courseName = course.title;
      }),
      switchMap(() =>
        from(
          this.adminRepository
            .findOneAndUpdate(
              { _id: adminId },
              { $pull: { course: courseName } },
            )
            .exec(),
        ),
      ),
      switchMap(() =>
        from(this.CourseModule.deleteOne({ _id: objectid }).exec()),
      ),
      switchMap(() =>
        from(
          this.RouteModule.updateMany(
            { courses: { $in: [courseName] } },
            { $pull: { courses: courseName } },
          ).exec(),
        ),
      ),
      switchMap(() => {
        return from(
          this.RouteModule.find({ courses: { $size: 0 } }, { title: 1 }).exec(),
        ).pipe(
          map((routes) => routes.map((route) => route.title)),
          switchMap((routeNames) => {
            return from(this.adminRepository.find({}).exec()).pipe(
              switchMap((admins) => {
                const updates$ = admins.map((admin) => {
                  routeNames.forEach((routeName) => {
                    if (admin.route.includes(routeName)) {
                      admin.route = admin.route.filter(
                        (route) => route !== routeName,
                      );
                    }
                  });
                  return from(admin.save());
                });
                return forkJoin(updates$);
              }),
            );
          }),
        );
      }),
      switchMap(() =>
        from(
          this.RouteModule.find({ courses: { $size: 0 } }, { id: 1 }).exec(),
        ).pipe(
          map((routes) => routes.map((route) => route.id)),
          switchMap((routeNames) =>
            from(this.learnerRepository.find({}).exec()).pipe(
              switchMap((learners) => {
                const updates$ = learners.map((learner) => {
                  routeNames.forEach((routeName) => {
                    if (learner.route.includes(routeName)) {
                      learner.route = learner.route.filter(
                        (route) => route !== routeName,
                      );
                    }
                  });
                  return from(learner.save());
                });
                return forkJoin(updates$);
              }),
            ),
          ),
        ),
      ),
      switchMap(() =>
        from(this.RouteModule.deleteMany({ courses: { $size: 0 } }).exec()),
      ),
      map(() => true),
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
          courseEntity.id = CourseDocuments._id;

          return courseEntity;
        });
        return Course;
      }),
      catchError(() => {
        throw new Error('no se encotron cursos ');
      }),
    );
  }

  getCourseByName(CourseName: string): Observable<CourseEntity> {
    console.log(CourseName);
    return from(this.CourseModule.findOne({ title: CourseName })).pipe(
      map((doc) => {
        if (!doc) {
          throw new Error('El curso  no existe');
        }
        return doc.toJSON();
      }),
      catchError(() => {
        throw new Error('Error al ob3tener el curso ');
      }),
    );
  }
}
