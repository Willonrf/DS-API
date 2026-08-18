import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { RingsService } from './rings.service';
import { CreateRingDto } from './dto/create-ring.dto';
import { CursorPaginationDto } from '../common/dtos/pagination.dto';

@Controller('rings')
export class RingsController {
  constructor(private readonly ringsService: RingsService) {}

  @Post('seed')
  @HttpCode(HttpStatus.CREATED)
  async seed() {
    const message = await this.ringsService.seedRings();
    return { message };
  }

  @Post()
  async create(@Body() createRingDto: CreateRingDto) {
    const savedRing = await this.ringsService.create(createRingDto);
    return {
      message: 'Ring cadastrado e validado com sucesso!',
      Weapon: savedRing,
    };
  }

  @Get()
  findAll(@Query() query: CursorPaginationDto) {
    return this.ringsService.findAll(query);
  }

  @Get(':name')
  findByName(@Param('name') name: string) {
    return this.ringsService.findByName(name);
  }
}
