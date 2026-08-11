import { PartialType } from '@nestjs/mapped-types';
import { CreateBossDto } from './create-boss.dto';

export class UpdateBossDto extends PartialType(CreateBossDto) {}
