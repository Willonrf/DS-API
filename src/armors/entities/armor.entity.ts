import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';

export interface PhysicalDefenses {
  standard: number;
  strike: number;
  slash: number;
  thrust: number;
}

export interface ElementalDefenses {
  magic: number;
  fire: number;
  lightning: number;
}

export interface ArmorResistances {
  bleed: number;
  poison: number;
  curse: number;
  poise: number;
}

@Entity('Armors')
export class Armor {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  name!: string;

  @Column()
  category!: 'Helm' | 'Armor' | 'Gauntlets' | 'Leggings';

  @Column()
  maxUpgradeLevel!: number;

  @Column()
  physicalDefenses!: PhysicalDefenses;

  @Column()
  elementalDefenses!: ElementalDefenses;

  @Column()
  resistances!: ArmorResistances;

  @Column()
  weight!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
