import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request} from '@nestjs/common';
import { PinService } from './pin.service';
import { Pin } from './entities/pin.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth-guard';

@Controller('pin')
export class PinController {
  constructor(private readonly pinService: PinService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPinDto,@Request() req) {
    console.log(req.user)
    return this.pinService.create(createPinDto);
  }

  @Get()
  findAll() {
    return this.pinService.findAll();
  }

  @Get('infos')
  getInfos() {
    return this.pinService.getInfos();
  }

  @Get(':pinId')
  getPin(@Param('pinId') id: string) {
    return this.pinService.getPin(id);
  }

  @Get(':id/username')
  findUser(@Param('id') id: string){
    return this.pinService.getUserName(id)
  }

  @Get(':lat/:long')
  findAlls(@Param('lat') lat: number,@Param('long') long: number) {
    return this.pinService.findAlls(lat,long);
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.pinService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePinDto: UpdatePinDto) {
  //   return this.pinService.update(+id, updatePinDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pinService.remove(+id);
  // }
}
