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

  async getInfoAboutUser(id:string):Promise<any>{
    let info:any
    const user=await this.usersRepository.findOne({
      where:{id:id}
    })
      let userInfo={name:"",scor:0,numberReports:0,numberFeedbacks:0}
      userInfo.name=user.name
      userInfo.scor=user.scor
      const pins=await this.pinRepository.find({where:{userId:user.id}})
      userInfo.numberReports=pins.length

      const feedbacks=await this.feedbackRepository.find({where:{userId:user.id}})
      userInfo.numberFeedbacks=feedbacks.length
      info=userInfo
   
    return info
  }

  async getInfos():Promise<any>{
    let infos=[]
    const users=await this.usersRepository.find()
    for(const user of users){
      if(user.name!='admin'){
      let userInfo={name:"",scor:0,numberReports:0,numberFeedbacks:0}
      userInfo.name=user.name
      userInfo.scor=user.scor
      const pins=await this.pinRepository.find({where:{userId:user.id}})
      userInfo.numberReports=pins.length

      const feedbacks=await this.feedbackRepository.find({where:{userId:user.id}})
      userInfo.numberFeedbacks=feedbacks.length

      infos.push(userInfo)

    }
  }
    infos=infos.sort((a,b)=>{
      return b.rating-a.rating
     })
     infos=infos.slice(0,15)
    return infos
  }

  async addUser(user: User) {
    user.password=await bcrypt.hash(user.password, 10);
    return await this.usersRepository.save(user);
  }

  async updateUser(user: User) {

}
}
