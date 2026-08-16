import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Consumable } from './entities/consumable.entity';
import { CreateConsumableDto } from './dto/create-consumable.dto';

@Injectable()
export class ConsumablesService {
  private readonly logger = new Logger(ConsumablesService.name);

  constructor(
    @InjectRepository(Consumable)
    private readonly consumableRepository: MongoRepository<Consumable>,
  ) {}

  async seedConsumables(): Promise<string> {
    const count = await this.consumableRepository.count();

    if (count > 0) {
      this.logger.warn(
        'Seed abortado: o banco de dados já possui bosses cadastrados.',
      );
      return 'Database already seeded!';
    }

    const consumableToSeed = [];

    const entities = this.consumableRepository.create(consumableToSeed);

    await this.consumableRepository.save(entities);

    this.logger.log(
      `Seed executado com sucesso! ${entities.length} Boss(es) inserido(s).`,
    );
    return 'Seed executed successfully!';
  }

  async findAll(): Promise<Consumable[]> {
    const consumables = await this.consumableRepository.find();
    this.logger.log(
      `Buscando todos os bosses. Total encontrado: ${consumables.length}`,
    );
    return consumables;
  }

  async findByName(name: string): Promise<Consumable> {
    const consumable = await this.consumableRepository.findOneBy({ name });

    if (!consumable) {
      throw new NotFoundException(
        `Boss com o nome '${name}' não foi encontrado na base de dados.`,
      );
    }

    return consumable;
  }

  async create(createConsumableDto: CreateConsumableDto): Promise<Consumable> {
    const newConsumable = this.consumableRepository.create(createConsumableDto);

    const savedConsumable = await this.consumableRepository.save(newConsumable);

    this.logger.log(`Novo Boss cadastrado via API: ${savedConsumable.name}`);
    return savedConsumable;
  }
}
