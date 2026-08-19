import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { GenericContainer, StartedTestContainer } from 'testcontainers';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mongoContainer: StartedTestContainer;

  beforeAll(async () => {
    mongoContainer = await new GenericContainer('mongo:latest')
      .withExposedPorts(27017)
      .start();

    const host = mongoContainer.getHost();
    const port = mongoContainer.getMappedPort(27017);
    process.env.MONGO_URI = `mongodb://${host}:${port}/dark_souls_test_db`;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
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
