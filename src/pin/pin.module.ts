import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { Pin } from './entities/pin.entity';
import { PinController } from './pin.controller';
import { PinRepository } from './pin.repository';
import { PinService } from './pin.service';

@Module({
  imports:[TypeOrmModule.forFeature([Pin,User])],
  controllers: [PinController],
  providers: [PinService,PinRepository,UserRepository]
})
export class PinModule {}
