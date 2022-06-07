import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Pin } from 'src/pin/entities/pin.entity';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User,Pin,Feedback])],
  providers: [UserService],
    exports:[UserService],
    controllers:[UserController]
})
export class UsersModule {}
