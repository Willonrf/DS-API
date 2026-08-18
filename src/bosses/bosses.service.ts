import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, MoreThan } from 'typeorm';
import { Boss } from './entities/boss.entity';
import { CreateBossDto } from './dto/create-boss.dto';
import { CursorPaginationDto } from '../common/dtos/pagination.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class BossesService {
  private readonly logger = new Logger(BossesService.name);

  constructor(
    @InjectRepository(Boss)
    private readonly bossRepository: MongoRepository<Boss>,
  ) {}

  async seedBosses(): Promise<string> {
    const count = await this.bossRepository.count();

    if (count > 0) {
      this.logger.warn(
        'Seed abortado: o banco de dados já possui bosses cadastrados.',
      );
      return 'Database already seeded!';
    }

    const bossesToSeed = [
      {
        name: 'Asylum Demon',
        baseHP: 813,
        baseDefenses: {
          standard: 90,
          strike: 90,
          slash: 90,
          thrust: 90,
          magic: 111,
          fire: 68,
          lightning: 111,
        },
        baseAttackRatings: {
          physical: 120,
          magic: 0,
          fire: 0,
          lightning: 0,
        },
        isParryableOverall: false,
        ngMultipliers: [
          {
            cycle: 0,
            hpMultiplier: 1.0,
            damageMultiplier: 1.0,
            defenseMultiplier: 1.0,
          },
          {
            cycle: 1,
            hpMultiplier: 2.37,
            damageMultiplier: 2.15,
            defenseMultiplier: 1.05,
          },
        ],
        attacks: [
          {
            attackName: 'Hammer Smash',
            motionValue: 1.2,
            damageType: 'strike' as const,
            isParryable: false,
            isBlockable: true,
            staminaDamageBase: 60,
          },
          {
            attackName: 'Flying Butt Drop',
            motionValue: 1.5,
            damageType: 'strike' as const,
            isParryable: false,
            isBlockable: false,
            staminaDamageBase: 100,
          },
        ],
      },
    ];

    const entities = this.bossRepository.create(bossesToSeed);

    await this.bossRepository.save(entities);

    this.logger.log(
      `Seed executado com sucesso! ${entities.length} Boss(es) inserido(s).`,
    );
    return 'Seed executed successfully!';
  }

  async findAll(query: CursorPaginationDto) {
    const { limit = 10, cursor } = query;
    const take = limit + 1;

    const bosses = await this.bossRepository.find({
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

  async findByName(name: string): Promise<Boss> {
    const boss = await this.bossRepository.findOneBy({ name });

    if (!boss) {
      throw new NotFoundException(
        `Boss com o nome '${name}' não foi encontrado na base de dados.`,
      );
    }

    return boss;
  }

  async create(createBossDto: CreateBossDto): Promise<Boss> {
    const newBoss = this.bossRepository.create(createBossDto);

    const savedBoss = await this.bossRepository.save(newBoss);

    this.logger.log(`Novo Boss cadastrado via API: ${savedBoss.name}`);
    return savedBoss;
  }
}
