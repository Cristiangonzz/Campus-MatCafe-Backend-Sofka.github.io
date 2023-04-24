import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AdminDelegate } from '../../Application/delegate/admin.delegate';
import { AdminEntity } from '../../Domain/entities/admin.entity';
import { LearnerEntity } from '../../Domain/entities/learner.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { AdminService } from '../service/admin.service';
import { CalificationDto } from '../utils/DTO/Calification.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('')
export class AdminController {
  private delegate: AdminDelegate;
  constructor(private readonly adminService: AdminService) {
    this.delegate = new AdminDelegate(adminService);
  }
  @ApiOperation({ summary: 'create  Admin' })
  @Post('createAdmin')
  createAdmin(@Body() admin: UserDto): Observable<AdminEntity> {
    this.delegate.toCreateAdmin();
    return this.delegate.execute(admin);
  }
  @ApiOperation({ summary: 'create  Learner' })
  @Post('createLearner')
  createLearner(@Body() learner: UserDto): Observable<LearnerEntity> {
    this.delegate.toCreateLearner();
    return this.delegate.execute(learner);
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
}
