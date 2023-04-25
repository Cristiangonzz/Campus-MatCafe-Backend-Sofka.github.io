import {
  Body,
  ConflictException,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { NotificationEntity } from 'src/Domain/entities';
import { AdminDelegate } from '../../Application/delegate/admin.delegate';
import { AdminEntity } from '../../Domain/entities/admin.entity';
import { LearnerEntity } from '../../Domain/entities/learner.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { CalificationPublisher } from '../messaging/calification.publisher';
import { AdminService } from '../service/admin.service';
import { CalificationDto } from '../utils/DTO/Calification.dto';

@ApiTags('Admin')
@Controller('')
export class AdminController {
  private delegate: AdminDelegate;
  constructor(
    private readonly adminService: AdminService,
    private readonly calificationPublisher: CalificationPublisher,
  ) {
    this.delegate = new AdminDelegate(adminService, calificationPublisher);
  }

  @ApiOperation({ summary: 'Create User' })
  @Post('createUser')
  createUser(@Body() user: UserDto): Observable<AdminEntity | LearnerEntity> {
    this.delegate.toGetAdminAndLearnerEmail();
    const search = this.delegate.execute(user.email).pipe(
      switchMap((data) => {
        if (data) {
          return of(
            new ConflictException(
              'Ya existe un usuario con el correo proporcionado',
            ),
          );
        }
      }),
      catchError((err) => {
        if (
          (err.message as string).includes(
            'No se encontró ni un administrador ni un estudiante con los IDs proporcionados',
          )
        ) {
          user.rol
            ? this.delegate.toCreateAdmin()
            : this.delegate.toCreateLearner();
          return this.delegate.execute(user);
        }
      }),
    );

    return search.pipe(
      catchError((err) => {
        console.log(err);
        return of(err);
      }),
    );
  }

  @ApiOperation({ summary: 'update  Admin' })
  @Put('updateAdmin/:email')
  updateAdmin(
    @Body() admin: UpdateUserDto,
    @Param('email') email: string,
  ): Observable<AdminEntity> {
    this.delegate.toUpdateAdmin();
    return this.delegate.execute(email, admin);
  }
  @ApiOperation({ summary: 'update  Learner' })
  @Put('updateLearner/:email')
  updateLearner(
    @Body() learner: UpdateUserDto,
    @Param('email') email: string,
  ): Observable<LearnerEntity> {
    this.delegate.toUpdateLearner();
    return this.delegate.execute(email, learner);
  }
  @ApiOperation({ summary: 'Get Admin' })
  @Get('admin/:email')
  getAdminByEmail(@Param('email') email: string): Observable<AdminEntity> {
    this.delegate.toGetAdminByEmail();
    return this.delegate.execute(email);
  }
  @ApiOperation({ summary: 'Get Learner' })
  @Get('learner/:email')
  getLearnerByEmail(@Param('email') email: string): Observable<LearnerEntity> {
    this.delegate.toGetLernerByEmail();
    return this.delegate.execute(email);
  }
  @ApiOperation({ summary: 'graderStudent' })
  @Post('graderStudent')
  graderStudent(@Body() learner: CalificationDto): Observable<string> {
    this.delegate.toGradeStudent();
    return this.delegate.execute(learner.learnerId, learner);
  }

  @Get('adminAndLearnerByEmail/:email')
  getAdminAndLearnerEmail(
    @Param('email') email: string,
  ): Observable<AdminEntity | LearnerEntity> {
    this.delegate.toGetAdminAndLearnerEmail();

    return this.delegate.execute(email);
  }
  @EventPattern('campus.notification')
  notification(@Payload() data: string): Observable<string> {
    const notification: {
      id: string;
      data: {
        id: string;
        github: string;
        learnedId: string;
        comment: string;
      };
    } = JSON.parse(data);
    const save = new NotificationEntity(
      notification.data.id,
      notification.data.github,
      notification.data.learnedId,
      notification.data.comment,
    );
    this.delegate.toSaveNotification();
    this.delegate.execute(notification.id, save);
    return of('ok');
  }
}
