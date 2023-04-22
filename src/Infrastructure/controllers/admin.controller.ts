import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AdminDelegate } from '../../Application/delegate/admin.delegate';
import { AdminEntity } from '../../Domain/entities/admin.entity';
import { LearnerEntity } from '../../Domain/entities/learner.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { AdminService } from '../service/admin.service';
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

  @Put('updateAdmin')
  updateAdmin(@Body() admin: UpdateUserDto): Observable<AdminEntity> {
    this.delegate.toUpdateAdmin();
    return this.delegate.execute(admin);
  }

  @Put('updateLearner')
  updateLearner(@Body() learner: UpdateUserDto): Observable<LearnerEntity> {
    this.delegate.toUpdateLearner();
    return this.delegate.execute(learner);
  }

  @Get('admin/:email')
  getAdminByEmail(@Param() email: string): Observable<AdminEntity> {
    this.delegate.toGetAdminByEmail();
    return this.delegate.execute(email);
  }

  @Get('learner/:email')
  getLearnerByEmail(@Param() email: string): Observable<LearnerEntity> {
    this.delegate.toGetLernerByEmail();
    return this.delegate.execute(email);
  }
}
