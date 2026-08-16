import {
  IsString,
  IsNumber,
  IsBoolean,
  ValidateNested,
  IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';

export class DamageModifiersDto {
  @IsNumber() globalMultiplier!: number;
  @IsNumber() criticalMultiplier!: number;
  @IsNumber() thrustCounterMultiplier!: number;
  @IsNumber() sorceryPyroMultiplier!: number;
  @IsNumber() miracleMultiplier!: number;
}

export class StatModifiersDto {
  @IsNumber() hpMultiplier!: number;
  @IsNumber() staminaMultiplier!: number;
  @IsNumber() equipLoadMultiplier!: number;
}

export class RingConditionsDto {
  @IsBoolean() requiresLowHp!: boolean;
}

export class CreateRingDto {
  @IsString() name!: string;
  @IsString() description!: string;
  @IsBoolean() isBreakable!: boolean;

  @IsDefined()
  @ValidateNested()
  @Type(() => DamageModifiersDto)
  damageModifiers!: DamageModifiersDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => StatModifiersDto)
  statModifiers!: StatModifiersDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => RingConditionsDto)
  conditions!: RingConditionsDto;
}
