import { Module } from '@nestjs/common';
import { WeaponsService } from './weapons.service';
import { WeaponsController } from './weapons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weapons } from './entities/weapons.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Weapons])],
  controllers: [WeaponsController],
  providers: [WeaponsService],
})
export class WeaponsModule {}
