import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, MoreThan } from 'typeorm';
import { Weapons } from './entities/weapons.entity';
import { CreateWeaponsDto } from './dto/create-weapons.dto';
import { CursorPaginationDto } from '../common/dtos/pagination.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class WeaponsService {
  private readonly logger = new Logger(WeaponsService.name);

  constructor(
    @InjectRepository(Weapons)
    private readonly weaponsRepository: MongoRepository<Weapons>,
  ) {}

  async seedWeapons(): Promise<string> {
    const count = await this.weaponsRepository.count();

    if (count > 0) {
      this.logger.warn(
        'Seed abortado: o banco de dados já possui armas cadastradas.',
      );
      return 'Database already seeded!';
    }

    const weaponsToSeed = [
      {
        name: 'Longsword',
        category: 'Straight Sword',
        upgradePath: 'Normal',
        maxUpgradeLevel: 15,
        baseDamage: {
          physical: 80,
          magic: 0,
          fire: 0,
          lightning: 0,
        },
        scalingGrades: {
          strength: 'C' as const,
          dexterity: 'C' as const,
          intelligence: '-' as const,
          faith: '-' as const,
        },
        requirements: {
          strength: 10,
          dexterity: 10,
          intelligence: 0,
          faith: 0,
        },
        isSpecial: false,
      },
      {
        name: 'Black Knight Sword',
        category: 'Greatsword',
        upgradePath: 'Unique',
        maxUpgradeLevel: 5,
        baseDamage: {
          physical: 230,
          magic: 0,
          fire: 0,
          lightning: 0,
        },
        scalingGrades: {
          strength: 'C' as const,
          dexterity: 'E' as const,
          intelligence: '-' as const,
          faith: '-' as const,
        },
        requirements: {
          strength: 20,
          dexterity: 18,
          intelligence: 0,
          faith: 0,
        },
        isSpecial: true,
      },
    ];

    const entities = this.weaponsRepository.create(weaponsToSeed);

    await this.weaponsRepository.save(entities);

    this.logger.log(
      `Seed de armas executado com sucesso! ${entities.length} arma(s) inserida(s).`,
    );
    return 'Weapon seed executed successfully!';
  }

  async findAll(query: CursorPaginationDto) {
    const { limit = 10, cursor } = query;
    const take = limit + 1;

    const weapons = await this.weaponsRepository.find({
      take: take,
      where: cursor ? { _id: MoreThan(new ObjectId(cursor)) } : {},
      order: { _id: 'ASC' },
    });

    let nextCursor: string | null = null;

    if (weapons.length > limit) {
      const nextItem = weapons.pop();
      if (nextItem && nextItem._id) {
        nextCursor = nextItem._id.toString();
      }
    }

    return {
      data: weapons,
      meta: {
        nextCursor,
        hasNextPage: nextCursor !== null,
      },
    };
  }

  async findByName(name: string): Promise<Weapons> {
    const weapon = await this.weaponsRepository.findOneBy({ name });

    if (!weapon) {
      throw new NotFoundException(
        `weapon com o nome '${name}' não foi encontrado na base de dados.`,
      );
    }

    return weapon;
  }

  async create(createWeaponsDto: CreateWeaponsDto): Promise<Weapons> {
    const newWeapon = this.weaponsRepository.create(createWeaponsDto);

    const savedWeapon = await this.weaponsRepository.save(newWeapon);

    this.logger.log(`Novo Weapon cadastrado via API: ${savedWeapon.name}`);
    return savedWeapon;
  }
}
