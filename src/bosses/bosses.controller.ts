import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Body,
} from '@nestjs/common';
import { BossesService } from './bosses.service';
import { CreateBossDto } from './dto/create-boss.dto';

@Controller('bosses')
export class BossesController {
  constructor(private readonly bossesService: BossesService) {}

  @Post('seed')
  @HttpCode(HttpStatus.CREATED)
  async seed() {
    const message = await this.bossesService.seedBosses();
    return { message };
  }

  @Post()
  async create(@Body() createBossDto: CreateBossDto) {
    const savedBoss = await this.bossesService.create(createBossDto);
    return {
      message: 'Boss cadastrado e validado com sucesso!',
      boss: savedBoss,
    };
  }

  @Get()
  async findAll() {
    return await this.bossesService.findAll();
  }

  @Get(':name')
  async findByName(@Param('name') name: string) {
    return await this.bossesService.findByName(name);
  }
}
