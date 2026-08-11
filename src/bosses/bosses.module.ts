import { Module } from '@nestjs/common';
import { BossesService } from './bosses.service';
import { BossesController } from './bosses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boss } from './entities/boss.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Boss])],
  controllers: [BossesController],
  providers: [BossesService],
})
export class BossesModule {}
