import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';

export type ConsumableCategory =
  'weapon_buff' | 'player_buff' | 'projectile' | 'utility';
export type ScalingGrade = 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | '-';

export interface WeaponBuffModifiers {
  addedPhysical: number;
  addedMagic: number;
  addedFire: number;
  addedLightning: number;
  addedPoison: number;
  addedBleed: number;
}

export interface PlayerBuffModifiers {
  globalDamageMultiplier: number;
  staminaRegenMultiplier: number;
}

export interface ProjectileStats {
  basePhysical: number;
  baseMagic: number;
  baseFire: number;
  baseLightning: number;
  scalingGrades: {
    strength: ScalingGrade;
    dexterity: ScalingGrade;
    intelligence: ScalingGrade;
    faith: ScalingGrade;
  };
}

@Entity('Consumables')
export class Consumable {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  name!: string;

  @Column()
  category!: ConsumableCategory;

  @Column()
  durationInSeconds!: number;

  @Column()
  weaponBuffModifiers?: WeaponBuffModifiers;

  @Column()
  playerBuffModifiers?: PlayerBuffModifiers;

  @Column()
  projectileStats?: ProjectileStats;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
