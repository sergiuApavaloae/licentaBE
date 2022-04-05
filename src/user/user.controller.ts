import {
    Body,
    Controller,
    Delete,
    Get,
    Injectable,
    Param,
    Post,
    Put,
    Req,
  } from '@nestjs/common';
import { User } from './user.entity';
  
import { UserService } from './user.service';
  
  @Injectable()
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Get(':email')
    async getOne(@Param('email') email: string) {
      return await this.userService.findOne(email);
    }
  
    @Get()
    async getAll() {
      return await this.userService.findAll();
    }
    
    @Post()
    async addUser(@Body() user:User) {
      return await this.userService.addUser(user);
    }
  
    
  }
  