import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { WeaponsService } from './weapons.service';
import { CreateWeaponsDto } from './dto/create-weapons.dto';

@Controller('weapon')
export class WeaponsController {
  constructor(private readonly weaponsService: WeaponsService) {}

  @Post('seed')
  @HttpCode(HttpStatus.CREATED)
  async seed() {
    const message = await this.weaponsService.seedWeapons();
    return { message };
  }

  @Post()
  async create(@Body() createWeaponsDto: CreateWeaponsDto) {
    const savedWeapon = await this.weaponsService.create(createWeaponsDto);
    return {
      message: 'Weapon cadastrado e validado com sucesso!',
      Weapon: savedWeapon,
    };
  }

  @Get()
  async findAll() {
    return this.weaponsService.findAll();
  }

  @Get(':name')
  findByName(@Param('name') name: string) {
    return this.weaponsService.findByName(name);
  }
}
