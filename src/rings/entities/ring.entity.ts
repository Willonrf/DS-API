import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';

export interface DamageModifiers {
  globalMultiplier: number;
  criticalMultiplier: number;
  thrustCounterMultiplier: number;
  sorceryPyroMultiplier: number;
  miracleMultiplier: number;
}

export interface StatModifiers {
  hpMultiplier: number;
  staminaMultiplier: number;
  equipLoadMultiplier: number;
}

export interface RingConditions {
  requiresLowHp: boolean;
}

@Entity('Rings')
export class Ring {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  isBreakable!: boolean;

  @Column()
  damageModifiers!: DamageModifiers;

  @Column()
  statModifiers!: StatModifiers;

  @Column()
  conditions!: RingConditions;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
