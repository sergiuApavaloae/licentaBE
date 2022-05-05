import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pin } from './entities/pin.entity';
import { PinRepository } from './pin.repository';

@Injectable()
export class PinService {
  constructor(
    @InjectRepository(Pin)
    private pinRepository: PinRepository,
  ) {}
  async create(pin: Pin) {
    return await this.pinRepository.save(pin);
  }
  findAll(): Promise<Pin[]> {
    return this.pinRepository.find();
  }
}
