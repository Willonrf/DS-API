import { Module } from '@nestjs/common';
import { RingsService } from './rings.service';
import { RingsController } from './rings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ring } from './entities/ring.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ring])],
  controllers: [RingsController],
  providers: [RingsService],
})
export class RingsModule {}
