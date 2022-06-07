import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { FeedbackRepository } from 'src/feedback/feedback.repository';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { Pin } from './entities/pin.entity';
import { PinController } from './pin.controller';
import { PinRepository } from './pin.repository';
import { PinService } from './pin.service';

@Module({
  imports:[TypeOrmModule.forFeature([Pin,User,Feedback])],
  controllers: [PinController],
  providers: [PinService,PinRepository,UserRepository,FeedbackRepository]
})
export class PinModule {}
