import { CalificationEntity } from 'src/Domain/entities';
import { ILearnerDomainService } from 'src/Domain/service/learner.service';

export class SaveCalificationUseCase {
  constructor(private readonly service: ILearnerDomainService) {}

  execute(calification: CalificationEntity) {
    return this.service.saveCalification(
      calification.grade,
      calification.comment,
      calification.courseId,
    );
  }
}
