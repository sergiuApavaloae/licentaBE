import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { Pin } from 'src/pin/entities/pin.entity';
import { PinRepository } from 'src/pin/pin.repository';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { FeedbackRepository } from 'src/feedback/feedback.repository';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: UserRepository,
    @InjectRepository(Pin)
    private pinRepository: PinRepository,
    @InjectRepository(Feedback)
    private feedbackRepository: FeedbackRepository
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email: email } });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async getInfos():Promise<any>{
    let infos=[]
    console.log("BEEEE")
    const users=await this.usersRepository.find()
    for(const user of users){
      let userInfo={name:"",scor:0,numberReports:0,numberFeedbacks:0}
      userInfo.name=user.name
      userInfo.scor=user.scor
      const pins=await this.pinRepository.find({where:{userId:user.id}})
      userInfo.numberReports=pins.length

      const feedbacks=await this.feedbackRepository.find({where:{userId:user.id}})
      userInfo.numberFeedbacks=feedbacks.length

      infos.push(userInfo)

    }
    infos.sort((a,b)=>{
      return a.rating-b.rating
     })
     infos=infos.slice(0,10)
    return infos
  }

  async addUser(user: User) {
    console.log(await bcrypt.hash('parola', 10))
    console.log(await bcrypt.hash('parola', 10))

    user.password=await bcrypt.hash(user.password, 10);
    return await this.usersRepository.save(user);
  }

  async updateUser(user: User) {
  //   const found: User = await this.usersRepository.findOne(user);
  //   if (found) {
  //     return await this.usersRepository.save(user);
  //   } else return;
  // }
}
}
