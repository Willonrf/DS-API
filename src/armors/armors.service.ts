import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, MoreThan } from 'typeorm';
import { Armor } from './entities/armor.entity';
import { CreateArmorDto } from './dto/create-armor.dto';
import { CursorPaginationDto } from '../common/dtos/pagination.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class ArmorsService {
  private readonly logger = new Logger(ArmorsService.name);

  constructor(
    @InjectRepository(Armor)
    private readonly armorRepository: MongoRepository<Armor>,
  ) {}

  async seedArmors(): Promise<string> {
    const count = await this.armorRepository.count();

    if (count > 0) {
      this.logger.warn(
        'Seed abortado: o banco de dados já possui armaduras cadastradas.',
      );
      return 'Database already seeded!';
    }

    const armorsToSeed = [];

    const entities = this.armorRepository.create(armorsToSeed);

    await this.armorRepository.save(entities);

    this.logger.log(
      `Seed de armadura executado com sucesso! ${entities.length} arma(s) inserida(s).`,
    );
    return 'Armadura seed executed successfully!';
  }

  async findAll(query: CursorPaginationDto) {
    const { limit = 10, cursor } = query;
    const take = limit + 1;

    const bosses = await this.armorRepository.find({
      take: take,
      where: cursor ? { _id: MoreThan(new ObjectId(cursor)) } : {},
      order: { _id: 'ASC' },
    });

    let nextCursor: string | null = null;

    if (bosses.length > limit) {
      const nextItem = bosses.pop();
      if (nextItem && nextItem._id) {
        nextCursor = nextItem._id.toString();
      }
    }

    return {
      data: bosses,
      meta: {
        nextCursor,
        hasNextPage: nextCursor !== null,
      },
    };
  }

  async findByName(name: string): Promise<Armor> {
    const armor = await this.armorRepository.findOneBy({ name });

    if (!armor) {
      throw new NotFoundException(
        `armor com o nome '${name}' não foi encontrado na base de dados.`,
      );
    }

    return armor;
  }

  async create(createArmorDto: CreateArmorDto): Promise<Armor> {
    const newArmor = this.armorRepository.create(createArmorDto);

    const savedArmor = await this.armorRepository.save(newArmor);

    this.logger.log(`Novo Armor cadastrado via API: ${savedArmor.name}`);
    return savedArmor;
  }
}
