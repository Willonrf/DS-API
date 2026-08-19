import { FastifyInstance } from 'fastify';
import { Server } from 'http';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { AppModule } from './../src/app.module';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mongoContainer: StartedTestContainer;

  beforeAll(async () => {
    mongoContainer = await new GenericContainer('mongo:latest')
      .withExposedPorts(27017)
      .start();

    let host = mongoContainer.getHost();
    if (host === 'localhost') {
      host = '127.0.0.1';
    }
    const port = mongoContainer.getMappedPort(27017);

    const dynamicMongoUri = `mongodb://${host}:${port}/dark_souls_test_db`;

    process.env.MONGO_URI = dynamicMongoUri;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigService)
      .useValue({
        get: (key: string) => {
          if (key === 'MONGO_URI') return dynamicMongoUri;
          if (key === 'PORT') return 3030;
          return null;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();

    const fastifyInstance = app
      .getHttpAdapter()
      .getInstance() as FastifyInstance;
    await fastifyInstance.ready();
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
          cycle: 1,
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

    const server = app.getHttpServer() as Server;

    const response = await request(server)
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
