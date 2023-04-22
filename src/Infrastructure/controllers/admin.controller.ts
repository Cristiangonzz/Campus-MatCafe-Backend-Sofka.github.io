import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AdminDelegate } from '../../Application/delegate/admin.delegate';
import { AdminEntity } from '../../Domain/entities/admin.entity';
import { LearnerEntity } from '../../Domain/entities/learner.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { AdminService } from '../service/admin.service';
import { CalificationDto } from '../utils/DTO/Calification.dto';
@Controller('')
export class AdminController {
  private delegate: AdminDelegate;
  constructor(private readonly adminService: AdminService) {
    this.delegate = new AdminDelegate(adminService);
  }

  @Post('createAdmin')
  createAdmin(@Body() admin: UserDto): Observable<AdminEntity> {
    this.delegate.toCreateAdmin();
    return this.delegate.execute(admin);
  }

  @Post('createLearner')
  createLearner(@Body() learner: UserDto): Observable<LearnerEntity> {
    this.delegate.toCreateLearner();
    return this.delegate.execute(learner);
  }

  @Put('updateAdmin/:email')
  updateAdmin(
    @Body() admin: UpdateUserDto,
    @Param('email') email: string,
  ): Observable<AdminEntity> {
    this.delegate.toUpdateAdmin();
    return this.delegate.execute(email, admin);
  }

  @Put('updateLearner/:email')
  updateLearner(
    @Body() learner: UpdateUserDto,
    @Param('email') email: string,
  ): Observable<LearnerEntity> {
    this.delegate.toUpdateLearner();
    return this.delegate.execute(email, learner);
  }

  @Get('admin/:email')
  getAdminByEmail(@Param('email') email: string): Observable<AdminEntity> {
    this.delegate.toGetAdminByEmail();
    return this.delegate.execute(email);
  }

  @Get('learner/:email')
  getLearnerByEmail(@Param('email') email: string): Observable<LearnerEntity> {
    this.delegate.toGetLernerByEmail();
    return this.delegate.execute(email);
  }
<<<<<<< HEAD
=======

  @Post('graderStudent')
  graderStudent(@Body() learner: CalificationDto): Observable<string> {
    this.delegate.toGradeStudent();
    return this.delegate.execute(learner.learnerId, learner);
  }
>>>>>>> e49be27ea6e4a3947e41e960bdadf7d052427282
}
