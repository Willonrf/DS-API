import { PartialType } from '@nestjs/mapped-types';
import { CreateWeaponsDto } from './create-weapons.dto';

export class UpdateWeaponDto extends PartialType(CreateWeaponsDto) {}
