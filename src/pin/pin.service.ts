import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { FeedbackRepository } from 'src/feedback/feedback.repository';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { Pin } from './entities/pin.entity';
import { PinRepository } from './pin.repository';

@Injectable()
export class PinService {
  constructor(
    @InjectRepository(Pin)
    private pinRepository: PinRepository,
    @InjectRepository(User)
    private userRepository:UserRepository,
    @InjectRepository(Feedback)
    private feedbackRepository: FeedbackRepository,
  ) {}
  async create(pin: Pin) {
    return await this.pinRepository.save(pin);
  }
  findAll(): Promise<Pin[]> {
    return this.pinRepository.find();
  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
   deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  async findAlls(lat:number,long:number): Promise<Pin[]> {
    const pins=await this.pinRepository.find();
    const availablePins=[]
    pins.forEach((pin)=>{
      if(this.getDistanceFromLatLonInKm(lat,long,pin.latitude,pin.longitude)<5)
        availablePins.push(pin)
    })
    return availablePins
  }

  async getUserName(pinId:string):Promise<User>{
    console.log('BE')
    // return await this.pinRepository.createQueryBuilder('pin')
    // .select('user.name','userName')
    // .innerJoin('user', 'user', 'pin.userId=user.user_id')
    // .andWhere(`pin.user_id=${pinId}::character varying`)
    // .printSql() 
    // .getRawMany();
    const pin=await this.pinRepository.findOne({
      where:{id:pinId}
    })

    const user=await this.userRepository.findOne({
      where:{id:pin.userId}
    })
    console.log(user.name)
    return user;
  }
  async getInfos(){
    let infos=[]
    const pins=await this.pinRepository.find()
    for(const pin of pins){
      let info={name:'',description:'',rating:0,userName:''}
      info.name=pin.name
      info.description=pin.description
      const feedbacks=await this.feedbackRepository.find({where:{pinId:pin.id}})
      for(const feedback of feedbacks){
        info.rating+=feedback.rating
      }

      const user=await this.userRepository.findOne({where:{id:pin.userId}})
      info.userName=user.name
      infos.push(info)
    }

    return infos
  }
  async getPin(id){
  const pin=await this.pinRepository.find({where:{id:id}})
  return pin
  }
}
