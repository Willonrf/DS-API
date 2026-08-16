import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Body,
} from '@nestjs/common';
import { ConsumablesService } from './consumables.service';
import { CreateConsumableDto } from './dto/create-consumable.dto';

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
  async findAll() {
    return await this.consumablesService.findAll();
  }

  @Get(':name')
  async findByName(@Param('name') name: string) {
    return await this.consumablesService.findByName(name);
  }
}
