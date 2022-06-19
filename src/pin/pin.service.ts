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
      if(this.getDistanceFromLatLonInKm(lat,long,pin.latitude,pin.longitude)<55)
        availablePins.push(pin)
    })
    return availablePins
  }

  async getUserName(pinId:string):Promise<User>{
    console.log('BE')
  
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

    infos.sort((a,b)=>{
      return a.rating-b.rating
     })
     infos=infos.slice(0,10)
    return infos
  }
  async getPin(id){
  const pin=await this.pinRepository.findOne({where:{id:id}})
  return pin
  }
 async getInfoAboutPin(pinId){
    const pin=await this.pinRepository.findOne({where:{id:pinId}})
    let info={name:'',description:'',rating:0,userName:'',average:0.0}
    info.name=pin.name
    info.description=pin.description
    const feedbacks=await this.feedbackRepository.find({where:{pinId:pin.id}})
    let numberOfFeedbacks=0
    for(const feedback of feedbacks){
      info.rating+=feedback.rating
    }
    info.average=info.rating/numberOfFeedbacks
    const user=await this.userRepository.findOne({where:{id:pin.userId}})
    info.userName=user.name

  return info
 }
  async createTest(){
    for(var i=1;i<=100;i++){
      const latitude=(Math.random() * (44.512 - 44.412) + 44.412).toFixed(5)
      const longitude=(Math.random() * (26.112 - 26.012) + 26.012).toFixed(5)
      const pin=new Pin()
      pin.latitude=latitude
      pin.longitude=longitude
      pin.description=''
      console.log(pin)
      await this.pinRepository.save(pin);
    }
    return []
  }
  async remove(id){
    const pin=await this.pinRepository.findOne({where:{id:id}})
    await this.pinRepository.remove(pin)
    return true
    }
}
