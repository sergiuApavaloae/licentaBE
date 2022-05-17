import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    private userRepository:UserRepository
  ) {}
  async create(pin: Pin) {
    return await this.pinRepository.save(pin);
  }
  findAll(): Promise<Pin[]> {
    return this.pinRepository.find();
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
}
