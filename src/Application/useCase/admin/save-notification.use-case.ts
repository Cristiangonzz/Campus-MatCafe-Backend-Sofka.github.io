import { NotificationEntity } from 'src/Domain/entities';
import { IAdminDomainService } from 'src/Domain/service';
export class SaveNotificationUseCase {
  constructor(private readonly service: IAdminDomainService) {}

  execute(learnerId: string, notification: NotificationEntity) {
    return this.service.saveNotification(learnerId, notification);
  }
}
