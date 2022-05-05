import {Repository } from 'typeorm';
import { Pin } from './entities/pin.entity';

export class PinRepository extends Repository<Pin> {}
