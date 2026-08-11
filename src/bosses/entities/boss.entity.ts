import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';

export interface DamageElements {
  physical: number;
  magic: number;
  fire: number;
  lightning: number;
}
export interface PhysicalDefenses {
  standard: number;
  strike: number;
  slash: number;
  thrust: number;
}
export interface NGCycleModifier {
  cycle: number;
  hpMultiplier: number;
  damageMultiplier: number;
  defenseMultiplier: number;
}
export interface BossAttack {
  attackName: string;
  motionValue: number;
  damageType:
    'standard' | 'strike' | 'slash' | 'thrust' | 'magic' | 'fire' | 'lightning';
  isParryable: boolean;
  isBlockable: boolean;
  staminaDamageBase: number;
}

@Entity('bosses')
export class Boss {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  name!: string;

  @Column()
  baseHP!: number;

  @Column()
  baseDefenses!: PhysicalDefenses & Omit<DamageElements, 'physical'>;

  @Column()
  baseAttackRatings!: DamageElements;

  @Column()
  isParryableOverall!: boolean;

  @Column()
  ngMultipliers!: NGCycleModifier[];

  @Column()
  attacks!: BossAttack[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
