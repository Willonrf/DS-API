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
import { ConsumablesService } from './consumables.service';
import { CreateConsumableDto } from './dto/create-consumable.dto';
import { CursorPaginationDto } from '../common/dtos/pagination.dto';

@Controller('consumables')
export class ConsumablesController {
  constructor(private readonly consumablesService: ConsumablesService) {}

  @Post('seed')
  @HttpCode(HttpStatus.CREATED)
  async seed() {
    const message = await this.consumablesService.seedConsumables();
    return { message };
  }

  @Post()
  async create(@Body() createConsumableDto: CreateConsumableDto) {
    const savedConsumable =
      await this.consumablesService.create(createConsumableDto);

    return {
      message: 'Consumable cadastrado e validado com sucesso!',
      Consumable: savedConsumable,
    };
  }

  @Get()
  findAll(@Query() query: CursorPaginationDto) {
    return this.consumablesService.findAll(query);
  }

  @Get(':name')
  findByName(@Param('name') name: string) {
    return this.consumablesService.findByName(name);
  }
}
