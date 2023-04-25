import { Observable } from 'rxjs';
import { CalificationEntity } from '../entities';
export interface ILearnerDomainService {
  sendWorkshop(
    learnedId: string,
    github: string,
    courseid: string,
    coment: string,
  ): Observable<string>;
  subscribeRoute(learnerId: string, idRoute: string): Observable<string>;
  saveCalification(
    grade: number,
    comment: string,
    courseId: string,
  ): Observable<CalificationEntity>;
}
