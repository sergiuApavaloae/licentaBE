import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pin } from 'src/pin/entities/pin.entity';
import { PinRepository } from 'src/pin/pin.repository';
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
        private userRepository: UserRepository,
        @InjectRepository(Pin)
        private pinRepository: PinRepository
      ) {}
    async create(feedback: Feedback) {
        console.log('HERE FEe')
        const user=await this.userRepository.findOne({
            where:{id:feedback.userId}
        })
        ;
        user.scor= user.scor+10
        await this.userRepository.save(user)
        const pin=await this.pinRepository.findOne({
          where:{id:feedback.pinId
          }
        })
        const userReport=await this.userRepository.findOne({
          where:{id:pin.userId}
      })

        userReport.scor+=feedback.rating
        console.log(userReport)
        await this.userRepository.save(userReport)
        return await this.feedbackRepository.save(feedback);
      }

    async getInfos(){
        let infos=[]
        
    }
}
