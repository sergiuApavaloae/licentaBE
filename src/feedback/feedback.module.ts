import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { FeedbackRepository } from './feedback.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/user.entity';
import { Pin } from 'src/pin/entities/pin.entity';
import { PinRepository } from 'src/pin/pin.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Feedback,User,Pin])],
  controllers: [FeedbackController],
  providers: [FeedbackService,FeedbackRepository,UserRepository,PinRepository]
})
export class FeedbackModule {}
