import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { info } from 'console';
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
    var R = 6371; 
    var dLat = this.deg2rad(lat2-lat1);
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.asin(Math.sqrt(a)) 
    var d = R * c;
    return d;
  }
  
   deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  async findAlls(lat:number,long:number): Promise<Pin[]> {
    const pins=await this.pinRepository.find();
    const availablePins=[]
    pins.forEach((pin)=>{
      if(this.getDistanceFromLatLonInKm(lat,long,pin.latitude,pin.longitude)<10)
        availablePins.push(pin)
    })
    return availablePins
  }

  async getUserName(pinId:string):Promise<User>{
  
    const pin=await this.pinRepository.findOne({
      where:{id:pinId}
    })

    const user=await this.userRepository.findOne({
      where:{id:pin.userId}
    })
    return user;
  }
  async getInfos(){
    let infos=[]
    const pins=await this.pinRepository.find()
    for(const pin of pins){
      let info={id:'',average:0.0,rating:0,userName:'',latitude:'',longitude:''}
      info.latitude=pin.latitude.slice(0,6)
      info.longitude=pin.longitude.slice(0,6)
      info.id=pin.id
      const feedbacks=await this.feedbackRepository.find({where:{pinId:pin.id}})
      let numberOfFeedbacks=0
      for(const feedback of feedbacks){
        info.rating+=feedback.rating
        numberOfFeedbacks+=1
      }
      info.average=info.rating/numberOfFeedbacks
      const user=await this.userRepository.findOne({where:{id:pin.userId}})
      info.userName=user.name
      infos.push(info)
    }

    infos=infos.sort((a,b)=>{
      return b.rating-a.rating
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
    let info={name:'',description:'',rating:0,userName:'',average:0.0,numberOfFeedbacks:0}
    info.description=pin.description
    const feedbacks=await this.feedbackRepository.find({where:{pinId:pin.id}})
    let numberOfFeedbacks=0
    for(const feedback of feedbacks){
      info.rating+=feedback.rating
      numberOfFeedbacks+=1
    }
    info.average=info.rating/numberOfFeedbacks
    const user=await this.userRepository.findOne({where:{id:pin.userId}})
    info.userName=user.name
    info.numberOfFeedbacks=numberOfFeedbacks

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
      pin.type='Streets'
      await this.pinRepository.save(pin);
    }
    for(var i=1;i<=50;i++){
      const latitude=(Math.random() * (44.512 - 44.412) + 44.412).toFixed(5)
      const longitude=(Math.random() * (26.112 - 26.012) + 26.012).toFixed(5)
      const pin=new Pin()
      pin.latitude=latitude
      pin.longitude=longitude
      pin.description=''
      pin.type='Parks'
      await this.pinRepository.save(pin);
    }

    for(var i=1;i<=50;i++){
      const latitude=(Math.random() * (44.512 - 44.412) + 44.412).toFixed(5)
      const longitude=(Math.random() * (26.112 - 26.012) + 26.012).toFixed(5)
      const pin=new Pin()
      pin.latitude=latitude
      pin.longitude=longitude
      pin.description=''
      pin.type='Animals'
      await this.pinRepository.save(pin);
    }
    for(var i=1;i<=50;i++){
      const latitude=(Math.random() * (44.512 - 44.412) + 44.412).toFixed(5)
      const longitude=(Math.random() * (26.112 - 26.012) + 26.012).toFixed(5)
      const pin=new Pin()
      pin.latitude=latitude
      pin.longitude=longitude
      pin.description=''
      pin.type='Other'
      await this.pinRepository.save(pin);
    }
    for(var i=1;i<=50;i++){
      const latitude=(Math.random() * (44.512 - 44.412) + 44.412).toFixed(5)
      const longitude=(Math.random() * (26.112 - 26.012) + 26.012).toFixed(5)
      const pin=new Pin()
      pin.latitude=latitude
      pin.longitude=longitude
      pin.description=''
      pin.type='Salubrity'
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
