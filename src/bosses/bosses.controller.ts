import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { BossesService } from './bosses.service';
import { CreateBossDto } from './dto/create-boss.dto';
import { CursorPaginationDto } from '../common/dtos/pagination.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('bosses')
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
      message: 'Bosses cadastrado e validado com sucesso!',
      boss: savedBoss,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os chefões com paginação' })
  findAll(@Query() query: CursorPaginationDto) {
    return this.bossesService.findAll(query);
  }

  @Get(':name')
  findByName(@Param('name') name: string) {
    return this.bossesService.findByName(name);
  }
}
