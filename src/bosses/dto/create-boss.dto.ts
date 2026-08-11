import {
  IsString,
  IsNumber,
  IsBoolean,
  ValidateNested,
  IsDefined,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class DamageElementsDto {
  @IsNumber() physical!: number;
  @IsNumber() magic!: number;
  @IsNumber() fire!: number;
  @IsNumber() lightning!: number;
}

export class BossDefensesDto {
  @IsNumber() standard!: number;
  @IsNumber() strike!: number;
  @IsNumber() slash!: number;
  @IsNumber() thrust!: number;
  @IsNumber() magic!: number;
  @IsNumber() fire!: number;
  @IsNumber() lightning!: number;
}

export class BossAttackDto {
  @IsString() attackName!: string;
  @IsNumber() motionValue!: number;

  // Mantemos o decorator, mas mudamos o TIPO no TypeScript:
  @IsEnum([
    'standard',
    'strike',
    'slash',
    'thrust',
    'magic',
    'fire',
    'lightning',
  ])
  damageType!:
    'standard' | 'strike' | 'slash' | 'thrust' | 'magic' | 'fire' | 'lightning';

  @IsBoolean() isParryable!: boolean;
  @IsBoolean() isBlockable!: boolean;
  @IsNumber() staminaDamageBase!: number;
}

export class NGCycleModifierDto {
  @IsNumber() cycle!: number;
  @IsNumber() hpMultiplier!: number;
  @IsNumber() damageMultiplier!: number;
  @IsNumber() defenseMultiplier!: number;
}

export class CreateBossDto {
  @IsString() name!: string;
  @IsNumber() baseHP!: number;

  @IsDefined()
  @ValidateNested()
  @Type(() => BossDefensesDto)
  baseDefenses!: BossDefensesDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => DamageElementsDto)
  baseAttackRatings!: DamageElementsDto;

  @IsBoolean() isParryableOverall!: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NGCycleModifierDto)
  ngMultipliers!: NGCycleModifierDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BossAttackDto)
  attacks!: BossAttackDto[];
}
