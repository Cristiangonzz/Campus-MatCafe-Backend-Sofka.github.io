import { Observable } from 'rxjs';
export interface ILearnerDomainService {
  sendWorkshop(
    learnedId: string,
    github: string,
    courseid: string,
    coment: string,
  ): Observable<string>;
  subscribeRoute(learnerId: string, idRoute: string): Observable<string>;
}