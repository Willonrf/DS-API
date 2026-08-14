import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ArmorsService } from './armors.service';
import { CreateArmorDto } from './dto/create-armor.dto';

@Controller('armors')
export class ArmorsController {
  constructor(private readonly armorsService: ArmorsService) {}

  @Post('seed')
  @HttpCode(HttpStatus.CREATED)
  async seed() {
    const message = await this.armorsService.seedArmors();
    return { message };
  }

  @Post()
  async create(@Body() createArmorDto: CreateArmorDto) {
    const savedArmor = await this.armorsService.create(createArmorDto);
    return {
      message: 'Armor cadastrado e validado com sucesso!',
      Armor: savedArmor,
    };
  }

  @Get()
  async findAll() {
    return this.armorsService.findAll();
  }

  @Get(':name')
  findByName(@Param('name') name: string) {
    return this.armorsService.findByName(name);
  }
}
