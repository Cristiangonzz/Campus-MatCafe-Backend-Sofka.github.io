import { IRoute } from '..';

export class RouteEntity implements IRoute {
  title: string;
  description: string;
  duration: string;
  courses: string[];
  adminId: string;
  id?: string;

  constructor(
    title?: string,
    description?: string,
    duration?: string,
    courses?: string[],
    adminId?: string,
  ) {
    this.title = title;
    this.description = description;
    this.duration = duration;
    this.courses = courses;
    this.adminId = adminId;
  }
}
