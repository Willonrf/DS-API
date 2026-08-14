import {
  IsString,
  IsNumber,
  ValidateNested,
  IsDefined,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PhysicalDefensesDto {
  @IsNumber() standard!: number;
  @IsNumber() strike!: number;
  @IsNumber() slash!: number;
  @IsNumber() thrust!: number;
}

export class ElementalDefensesDto {
  @IsNumber() magic!: number;
  @IsNumber() fire!: number;
  @IsNumber() lightning!: number;
}

export class ArmorResistancesDto {
  @IsNumber() bleed!: number;
  @IsNumber() poison!: number;
  @IsNumber() curse!: number;
  @IsNumber() poise!: number;
}

export class CreateArmorDto {
  @IsString() name!: string;

  @IsEnum(['Helm', 'Armor', 'Gauntlets', 'Leggings'])
  category!: 'Helm' | 'Armor' | 'Gauntlets' | 'Leggings';

  @IsNumber() maxUpgradeLevel!: number;

  @IsDefined()
  @ValidateNested()
  @Type(() => PhysicalDefensesDto)
  physicalDefenses!: PhysicalDefensesDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => ElementalDefensesDto)
  elementalDefenses!: ElementalDefensesDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => ArmorResistancesDto)
  resistances!: ArmorResistancesDto;

  @IsNumber() weight!: number;
}
