import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { DriverLicenseDTO } from '../src/service/dto/driver-license.dto';
import { DriverLicenseService } from '../src/service/driver-license.service';

describe('DriverLicense Controller', () => {
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
            .overrideProvider(DriverLicenseService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all driver-licenses ', async () => {
        const getEntities: DriverLicenseDTO[] = (
            await request(app.getHttpServer())
                .get('/api/driver-licenses')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET driver-licenses by id', async () => {
        const getEntity: DriverLicenseDTO = (
            await request(app.getHttpServer())
                .get('/api/driver-licenses/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create driver-licenses', async () => {
        const createdEntity: DriverLicenseDTO = (
            await request(app.getHttpServer())
                .post('/api/driver-licenses')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update driver-licenses', async () => {
        const updatedEntity: DriverLicenseDTO = (
            await request(app.getHttpServer())
                .put('/api/driver-licenses')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update driver-licenses from id', async () => {
        const updatedEntity: DriverLicenseDTO = (
            await request(app.getHttpServer())
                .put('/api/driver-licenses/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE driver-licenses', async () => {
        const deletedEntity: DriverLicenseDTO = (
            await request(app.getHttpServer())
                .delete('/api/driver-licenses/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
