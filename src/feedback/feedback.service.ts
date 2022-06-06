import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { FeedbackRepository } from './feedback.repository';

@Injectable()
export class FeedbackService {
    constructor(
        @InjectRepository(Feedback)
        private feedbackRepository: FeedbackRepository,
      ) {}
    async create(feedback: Feedback) {
        console.log('HERE FEe')
        return await this.feedbackRepository.save(feedback);
      }
}
