import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { FeedbackRepository } from './feedback.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Feedback,User])],
  controllers: [FeedbackController],
  providers: [FeedbackService,FeedbackRepository,UserRepository]
})
export class FeedbackModule {}
