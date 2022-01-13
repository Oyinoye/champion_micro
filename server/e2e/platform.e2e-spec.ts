import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { PlatformDTO } from '../src/service/dto/platform.dto';
import { PlatformService } from '../src/service/platform.service';

describe('Platform Controller', () => {
    let app: INestApplication;

    const authGuardMock = { canActivate: (): any => true };
    const rolesGuardMock = { canActivate: (): any => true };
    const entityMock: any = {
        id: 'entityId',
    };

    const serviceMock = {
        findById: (): any => entityMock,
        findAndCount: (): any => [entityMock, 0],
        save: (): any => entityMock,
        update: (): any => entityMock,
        deleteById: (): any => entityMock,
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(AuthGuard)
            .useValue(authGuardMock)
            .overrideGuard(RolesGuard)
            .useValue(rolesGuardMock)
            .overrideProvider(PlatformService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all platforms ', async () => {
        const getEntities: PlatformDTO[] = (
            await request(app.getHttpServer())
                .get('/api/platforms')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET platforms by id', async () => {
        const getEntity: PlatformDTO = (
            await request(app.getHttpServer())
                .get('/api/platforms/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create platforms', async () => {
        const createdEntity: PlatformDTO = (
            await request(app.getHttpServer())
                .post('/api/platforms')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update platforms', async () => {
        const updatedEntity: PlatformDTO = (
            await request(app.getHttpServer())
                .put('/api/platforms')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update platforms from id', async () => {
        const updatedEntity: PlatformDTO = (
            await request(app.getHttpServer())
                .put('/api/platforms/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE platforms', async () => {
        const deletedEntity: PlatformDTO = (
            await request(app.getHttpServer())
                .delete('/api/platforms/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
