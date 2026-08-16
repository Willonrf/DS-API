import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class WeaponBuffModifiersDto {
  @IsNumber() addedPhysical!: number;
  @IsNumber() addedMagic!: number;
  @IsNumber() addedFire!: number;
  @IsNumber() addedLightning!: number;
  @IsNumber() addedPoison!: number;
  @IsNumber() addedBleed!: number;
}

export class PlayerBuffModifiersDto {
  @IsNumber() globalDamageMultiplier!: number;
  @IsNumber() staminaRegenMultiplier!: number;
}

export class ProjectileScalingDto {
  @IsEnum(['S', 'A', 'B', 'C', 'D', 'E', '-'])
  strength!: 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | '-';

  @IsEnum(['S', 'A', 'B', 'C', 'D', 'E', '-'])
  dexterity!: 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | '-';

  @IsEnum(['S', 'A', 'B', 'C', 'D', 'E', '-'])
  intelligence!: 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | '-';

  @IsEnum(['S', 'A', 'B', 'C', 'D', 'E', '-'])
  faith!: 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | '-';
}

export class ProjectileStatsDto {
  @IsNumber() basePhysical!: number;
  @IsNumber() baseMagic!: number;
  @IsNumber() baseFire!: number;
  @IsNumber() baseLightning!: number;

  @ValidateNested()
  @Type(() => ProjectileScalingDto)
  scalingGrades!: ProjectileScalingDto;
}

export class CreateConsumableDto {
  @IsString() name!: string;

  @IsEnum(['weapon_buff', 'player_buff', 'projectile', 'utility'])
  category!: 'weapon_buff' | 'player_buff' | 'projectile' | 'utility';

  @IsNumber() durationInSeconds!: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => WeaponBuffModifiersDto)
  weaponBuffModifiers?: WeaponBuffModifiersDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PlayerBuffModifiersDto)
  playerBuffModifiers?: PlayerBuffModifiersDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProjectileStatsDto)
  projectileStats?: ProjectileStatsDto;
}
