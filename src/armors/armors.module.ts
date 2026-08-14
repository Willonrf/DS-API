import { Module } from '@nestjs/common';
import { ArmorsService } from './armors.service';
import { ArmorsController } from './armors.controller';
import { Armor } from './entities/armor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Armor])],
  controllers: [ArmorsController],
  providers: [ArmorsService],
})
export class ArmorsModule {}
