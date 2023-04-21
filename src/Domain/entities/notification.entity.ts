import { INotification } from '../interface/notifiation.interface';

export class Notification implements INotification {
  id: string;
  repo: string;
  course: string;

  constructor(id: string, repo: string, course: string) {
    this.id = id;
    this.repo = repo;
    this.course = course;
  }
}
