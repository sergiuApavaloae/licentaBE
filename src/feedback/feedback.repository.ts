import {Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';

export class FeedbackRepository extends Repository<Feedback> {}