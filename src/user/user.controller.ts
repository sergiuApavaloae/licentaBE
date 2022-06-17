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
  
    @Get('infos')
    async getInfos() {
       console.log('BEEEEE@@@')
       const infos=await this.userService.getInfos();
       return infos
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
      return await this.userService.getInfoAboutUser(id);
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
  