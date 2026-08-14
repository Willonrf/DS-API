import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';

export type ScalingGrade = 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | '-';

export interface WeaponsRequirements {
  strength: number;
  dexterity: number;
  intelligence: number;
  faith: number;
}

export interface DamageValues {
  physical: number;
  magic: number;
  fire: number;
  lightning: number;
}

export interface ScalingTiers {
  strength: ScalingGrade;
  dexterity: ScalingGrade;
  intelligence: ScalingGrade;
  faith: ScalingGrade;
}

@Entity('Weapons')
export class Weapons {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  name!: string;

  @Column()
  category!: string;

  @Column()
  upgradePath!: string;

  @Column()
  maxUpgradeLevel!: number;

  @Column()
  baseDamage!: DamageValues;

  @Column()
  scalingGrades!: ScalingTiers;

  @Column()
  requirements!: WeaponsRequirements;

  @Column()
  isSpecial!: boolean; // Se usa Twinkling Titanite ou Demon Titanite

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
