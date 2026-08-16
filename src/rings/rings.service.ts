import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Ring } from './entities/ring.entity';
import { CreateRingDto } from './dto/create-ring.dto';

@Injectable()
export class RingsService {
  private readonly logger = new Logger(RingsService.name);

  constructor(
    @InjectRepository(Ring)
    private readonly ringRepository: MongoRepository<Ring>,
  ) {}

  async seedRings(): Promise<string> {
    const count = await this.ringRepository.count();

    if (count > 0) {
      this.logger.warn(
        'Seed abortado: o banco de dados já possui armas cadastradas.',
      );
      return 'Database already seeded!';
    }

    const ringsToSeed = [];

    const entities = this.ringRepository.create(ringsToSeed);

    await this.ringRepository.save(entities);

    this.logger.log(
      `Seed de rings executado com sucesso! ${entities.length} ring(s) inserida(s).`,
    );
    return 'Weapon seed executed successfully!';
  }

  async findAll(): Promise<Ring[]> {
    const ring = await this.ringRepository.find();
    this.logger.log(
      `Buscando todos os bosses. Total encontrado: ${ring.length}`,
    );
    return ring;
  }

  async findByName(name: string): Promise<Ring> {
    const ring = await this.ringRepository.findOneBy({ name });

    if (!ring) {
      throw new NotFoundException(
        `ring com o nome '${name}' não foi encontrado na base de dados.`,
      );
    }

    return ring;
  }

  async create(createRingDto: CreateRingDto): Promise<Ring> {
    const newRing = this.ringRepository.create(createRingDto);

    const savedRing = await this.ringRepository.save(newRing);

    this.logger.log(`Novo Ring cadastrado via API: ${savedRing.name}`);
    return savedRing;
  }
}
