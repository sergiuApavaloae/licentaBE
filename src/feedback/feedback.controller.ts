import { Controller, Get, Post, Body,Request, Injectable, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth-guard';
import { Feedback } from './entities/feedback.entity';
import { FeedbackService } from './feedback.service';

@Injectable()
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}
  
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() feedback:Feedback,@Request() req) {
    return this.feedbackService.create(feedback);
  }
  
  @Get('infos')
  @UseGuards(JwtAuthGuard)
  getInfos(){
    return this.feedbackService.getInfos()
  }

}
