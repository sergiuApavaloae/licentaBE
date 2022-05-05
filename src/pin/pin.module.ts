import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pin } from './entities/pin.entity';
import { PinController } from './pin.controller';
import { PinRepository } from './pin.repository';
import { PinService } from './pin.service';

@Module({
  imports:[TypeOrmModule.forFeature([Pin])],
  controllers: [PinController],
  providers: [PinService,PinRepository]
})
export class PinModule {}
