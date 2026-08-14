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
  category!: string; // Ex: 'Straight Sword', 'Greatsword', 'Catalyst'

  @Column()
  upgradePath!: string; // Ex: 'Normal', 'Crystal', 'Lightning', 'Chaos', 'Divine'

  @Column()
  maxUpgradeLevel!: number; // Ex: 15 para Normal, 5 para Boss/Twinkling

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
