import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { Feedback } from './entities/feedback.entity';
import { FeedbackRepository } from './feedback.repository';

@Injectable()
export class FeedbackService {
    constructor(
        @InjectRepository(Feedback)
        private feedbackRepository: FeedbackRepository,
        @InjectRepository(User)
        private userRepository: UserRepository
      ) {}
    async create(feedback: Feedback) {
        console.log('HERE FEe')
        const user=await this.userRepository.findOne({
            where:{id:feedback.userId}
        })
        ;
        user.scor= user.scor+10

        console.log(user)
        await this.userRepository.save(user)
        return await this.feedbackRepository.save(feedback);
      }
}
