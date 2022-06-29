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
    UseGuards,
  } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth-guard';
import { User } from './user.entity';
  
import { UserService } from './user.service';
  
  @Injectable()
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Get('infos')
    @UseGuards(JwtAuthGuard)
    async getInfos() {
       const infos=await this.userService.getInfos();
       return infos
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getOne(@Param('id') id: string) {
      return await this.userService.getInfoAboutUser(id);
    }

  
    @Get()
    @UseGuards(JwtAuthGuard)
    async getAll() {
      return await this.userService.findAll();
    }
    
    @Post()
    async addUser(@Body() user:User) {
      return await this.userService.addUser(user);
    }
  
    
  }
  