import { Injectable } from '@nestjs/common';
import { Observable, catchError, from, map, switchMap } from 'rxjs';
import {
  AdminDocument,
  Course,
  CourseDocument,
  Route,
  RouteDocument,
} from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, ObjectId } from 'mongodb';
import { RouteEntity } from 'src/Domain/entities';

@Injectable()
export class RouteRepository {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminRepository: Model<AdminDocument>,
    @InjectModel(Route.name)
    private readonly RouteModule: Model<RouteDocument>,
    @InjectModel(Course.name)
    private readonly CourseModule: Model<CourseDocument>,
  ) {}
  createRoute(route: RouteEntity): Observable<RouteEntity> {
    return from(this.adminRepository.findById(route.adminId)).pipe(
      switchMap((admin: AdminDocument) => {
        if (!admin) {
          throw new Error(
            `No se encontró un administrador con el ID ${route.adminId}`,
          );
        }

        const courseNames = route.courses;

        return from(
          this.CourseModule.find({ title: { $in: courseNames } }).exec(),
        ).pipe(
          switchMap((courses: CourseDocument[]) => {
            if (courses.length !== courseNames.length) {
              const foundCourseNames = courses.map((c) => c.title);
              const missingCourseNames = courseNames.filter((title) =>
                foundCourseNames.every((n) => n !== title),
              );
              throw new Error(
                `No se encontraron los siguientes cursos: ${missingCourseNames.join(
                  ', ',
                )}`,
              );
            }

            return from(this.RouteModule.create(route)).pipe(
              map((doc) => doc.toJSON() as RouteEntity),
              catchError((error) => {
                console.error('Error al crear la ruta:', error);
                throw new Error('Error al crear la ruta');
              }),
            );
          }),
        );
      }),
    );
  }

  updateRoute(id: string, Route: RouteEntity): Observable<RouteEntity> {
    const objectId = new ObjectId(id);
    return from(
      this.RouteModule.findOneAndUpdate(
        { _id: objectId },
        { $set: Route },
        { new: true },
      ).exec(),
    ).pipe(
      map((doc) => {
        const { adminId, courses, description, duration, title } = doc;
        return new RouteEntity(title, description, duration, courses, adminId);
      }),
    );
  }

  deleteRoute(RouteId: string): Observable<boolean> {
    const objectId = new ObjectId(RouteId);
    return from(this.RouteModule.deleteOne({ _id: objectId }).exec()).pipe(
      map((result) => result.deletedCount > 0),
    );
  }

  getRoute(RouteId: string): Observable<RouteEntity> {
    return from(this.RouteModule.findById(RouteId)).pipe(
      map((doc) => doc?.toJSON()),
      catchError((error) => {
        console.error('Error al obtener la ruta:', error);
        throw new Error('Error al obtener la ruta');
      }),
    );
  }

  getAllRoutes(): Observable<RouteEntity[]> {
    return from(this.RouteModule.find().exec()).pipe(
      map((RouteDocuments: RouteDocument[]) => {
        const route = RouteDocuments.map((RouteDocuments) => {
          const routeEntity = new RouteEntity();
          routeEntity.adminId = RouteDocuments.adminId;
          routeEntity.courses = RouteDocuments.courses;
          routeEntity.description = RouteDocuments.description;
          routeEntity.duration = RouteDocuments.duration;
          routeEntity.title = RouteDocuments.title;
          return routeEntity;
        });
        return route;
      }),
      catchError(() => {
        throw new Error('Error find user');
      }),
    );
  }
}
