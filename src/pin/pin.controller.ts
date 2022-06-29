import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request, Sse} from '@nestjs/common';
import { PinService } from './pin.service';
import { Pin } from './entities/pin.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth-guard';
import { Observable } from 'rxjs';

@Controller('pin')
export class PinController {
  constructor(private readonly pinService: PinService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPinDto,@Request() req) {
    return this.pinService.create(createPinDto);
  }

  @Get('test')
  createTest() {
    return this.pinService.createTest();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.pinService.findAll();
  }

  @Get('infos')
  @UseGuards(JwtAuthGuard)
  getInfos() {
    return this.pinService.getInfos();
  }

  @Get('infos/:pinId')
  @UseGuards(JwtAuthGuard)
  getInfo(@Param('pinId') pinId:string) {
    return this.pinService.getInfoAboutPin(pinId);
  }

  @Get(':pinId')
  @UseGuards(JwtAuthGuard)
  getPin(@Param('pinId') id: string) {
    return this.pinService.getPin(id);
  }

  @Get(':id/username')
  @UseGuards(JwtAuthGuard)
  findUser(@Param('id') id: string){
    return this.pinService.getUserName(id)
  }

  @Get(':lat/:long')
  @UseGuards(JwtAuthGuard)
  findAlls(@Param('lat') lat: number,@Param('long') long: number) {
    return this.pinService.findAlls(lat,long);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.pinService.remove(id);
  }
}
