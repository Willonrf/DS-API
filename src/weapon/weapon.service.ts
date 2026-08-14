import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Weapon } from './entities/weapon.entity';
import { CreateWeaponDto } from './dto/create-weapon.dto';

@Injectable()
export class WeaponService {
  private readonly logger = new Logger(WeaponService.name);

  constructor(
    @InjectRepository(Weapon)
    private readonly weaponRepository: MongoRepository<Weapon>,
  ) {}

  async seedWeapons(): Promise<string> {
    const count = await this.weaponRepository.count();

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

    const entities = this.weaponRepository.create(weaponsToSeed);

    await this.weaponRepository.save(entities);

    this.logger.log(
      `Seed de armas executado com sucesso! ${entities.length} arma(s) inserida(s).`,
    );
    return 'Weapon seed executed successfully!';
  }

  async findAll(): Promise<Weapon[]> {
    const weapon = await this.weaponRepository.find();
    this.logger.log(
      `Buscando todos os bosses. Total encontrado: ${weapon.length}`,
    );
    return weapon;
  }

  async findByName(name: string): Promise<Weapon> {
    const weapon = await this.weaponRepository.findOneBy({ name });

    if (!weapon) {
      throw new NotFoundException(
        `weapon com o nome '${name}' não foi encontrado na base de dados.`,
      );
    }

    return weapon;
  }

  async create(createWeaponDto: CreateWeaponDto): Promise<Weapon> {
    const newWeapon = this.weaponRepository.create(createWeaponDto);

    const savedWeapon = await this.weaponRepository.save(newWeapon);

    this.logger.log(`Novo Weapon cadastrado via API: ${savedWeapon.name}`);
    return savedWeapon;
  }
}
