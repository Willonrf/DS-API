import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { WeaponService } from './weapon.service';
import { CreateWeaponDto } from './dto/create-weapon.dto';

@Controller('weapon')
export class WeaponController {
  constructor(private readonly weaponService: WeaponService) {}

  @Post('seed')
  @HttpCode(HttpStatus.CREATED)
  async seed() {
    const message = await this.weaponService.seedWeapons();
    return { message };
  }

  @Post()
  async create(@Body() createWeaponDto: CreateWeaponDto) {
    const savedWeapon = await this.weaponService.create(createWeaponDto);
    return {
      message: 'Weapon cadastrado e validado com sucesso!',
      Weapon: savedWeapon,
    };
  }

  @Get()
  async findAll() {
    return this.weaponService.findAll();
  }

  @Get(':name')
  findByName(@Param('name') name: string) {
    return this.weaponService.findByName(name);
  }
}
