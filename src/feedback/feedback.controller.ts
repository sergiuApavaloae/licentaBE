import { Controller, Get, Post, Body,Request, Injectable } from '@nestjs/common';
import { Feedback } from './entities/feedback.entity';
import { FeedbackService } from './feedback.service';

@Injectable()
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}
  
  @Post()
  create(@Body() feedback:Feedback,@Request() req) {
    console.log(feedback)
    return this.feedbackService.create(feedback);
  }
  
  @Get('infos')
  getInfos(){
    return this.feedbackService.getInfos()
  }
  // @Get(':id/username')
  // findUser(@Param('id') id: string){
  //   return this.pinService.getUserName(id)
  // }
}
