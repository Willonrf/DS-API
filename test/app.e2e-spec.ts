import { Test, TestingModule } from '@nestjs/testing';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { ConfigService } from '@nestjs/config';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;
  let mongoContainer: StartedTestContainer;

  beforeAll(async () => {
    mongoContainer = await new GenericContainer('mongo:6.0')
      .withExposedPorts(27017)
      .start();

    const host = mongoContainer.getHost();
    const port = mongoContainer.getMappedPort(27017);
    const mongoUri = `mongodb://${host}:${port}`;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigService)
      .useValue({
        get: (key: string) => {
          if (key === 'MONGO_URI') return mongoUri;
          if (key === 'DB_NAME') return 'darksouls_e2e_test';
          if (key === 'PORT') return 3030;
          return process.env[key];
        },
      })
      .compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();

    await app.getHttpAdapter().getInstance().ready();
  }, 60000);

  afterAll(async () => {
    if (app) {
      await app.close();
    }
    if (mongoContainer) {
      await mongoContainer.stop();
    }
  });

  it('/bosses (POST) - deve criar um novo boss', async () => {
    const novoBoss = {
      name: 'Taurus Demon',
      baseHP: 1215,
      baseDefenses: {
        standard: 105,
        strike: 105,
        slash: 105,
        thrust: 105,
        magic: 140,
        fire: 80,
        lightning: 105,
      },
      baseAttackRatings: {
        physical: 200,
        magic: 0,
        fire: 0,
        lightning: 0,
      },
      isParryableOverall: false,
      ngMultipliers: [
        {
          cycle: 1, // NG+
          hpMultiplier: 1.5,
          damageMultiplier: 1.5,
          defenseMultiplier: 1.1,
        },
      ],
      attacks: [
        {
          attackName: 'Jumping Smash',
          motionValue: 150,
          damageType: 'strike',
          isParryable: false,
          isBlockable: true,
          staminaDamageBase: 80,
        },
      ],
    };

    const response = await request(app.getHttpServer())
      .post('/bosses')
      .send(novoBoss)
      .expect(201);

    type ExpectedResponse = {
      message: string;
      boss: {
        _id: string;
        name: string;
        baseDefenses: { fire: number };
        attacks: { attackName: string }[];
      };
    };

    const body = response.body as ExpectedResponse;

    expect(body.message).toBe('Bosses cadastrado e validado com sucesso!');
    expect(body.boss).toHaveProperty('_id');
    expect(body.boss.name).toBe('Taurus Demon');
    expect(body.boss.baseDefenses.fire).toBe(80);
    expect(body.boss.attacks[0].attackName).toBe('Jumping Smash');
  });
});
