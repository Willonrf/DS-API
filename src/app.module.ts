import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BossesModule } from './bosses/bosses.module';
import { WeaponsModule } from './weapons/weapons.module';
import { ArmorsModule } from './armors/armors.module';
import { RingsModule } from './rings/rings.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3030),
        MONGO_URI: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('MONGO_URI'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        useNewUrlParser: true,
        logging: true,
      }),
    }),
    BossesModule,
    WeaponsModule,
    ArmorsModule,
    RingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
