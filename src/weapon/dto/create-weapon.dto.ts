import {
  IsString,
  IsNumber,
  IsBoolean,
  ValidateNested,
  IsDefined,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

class DamageValuesDto {
  @IsNumber() physical!: number;
  @IsNumber() magic!: number;
  @IsNumber() fire!: number;
  @IsNumber() lightning!: number;
}

export class ScalingTiersDto {
  @IsEnum(['S', 'A', 'B', 'C', 'D', 'E', '-'])
  strength!: 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | '-';

  @IsEnum(['S', 'A', 'B', 'C', 'D', 'E', '-'])
  dexterity!: 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | '-';

  @IsEnum(['S', 'A', 'B', 'C', 'D', 'E', '-'])
  intelligence!: 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | '-';

  @IsEnum(['S', 'A', 'B', 'C', 'D', 'E', '-'])
  faith!: 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | '-';
}

export class WeaponRequirementsDto {
  @IsNumber() strength!: number;
  @IsNumber() dexterity!: number;
  @IsNumber() intelligence!: number;
  @IsNumber() faith!: number;
}

export class CreateWeaponDto {
  @IsString() name!: string;
  @IsString() category!: string;
  @IsString() upgradePath!: string;
  @IsNumber() maxUpgradeLevel!: number;

  @IsDefined()
  @ValidateNested()
  @Type(() => DamageValuesDto)
  baseDamage!: DamageValuesDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => ScalingTiersDto)
  scalingGrades!: ScalingTiersDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => WeaponRequirementsDto)
  requirements!: WeaponRequirementsDto;

  @IsBoolean() isSpecial!: boolean;
}
