import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { BankDetailsDTO } from '../src/service/dto/bank-details.dto';
import { BankDetailsService } from '../src/service/bank-details.service';

describe('BankDetails Controller', () => {
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
            .overrideProvider(BankDetailsService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all bank-details ', async () => {
        const getEntities: BankDetailsDTO[] = (
            await request(app.getHttpServer())
                .get('/api/bank-details')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET bank-details by id', async () => {
        const getEntity: BankDetailsDTO = (
            await request(app.getHttpServer())
                .get('/api/bank-details/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create bank-details', async () => {
        const createdEntity: BankDetailsDTO = (
            await request(app.getHttpServer())
                .post('/api/bank-details')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update bank-details', async () => {
        const updatedEntity: BankDetailsDTO = (
            await request(app.getHttpServer())
                .put('/api/bank-details')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update bank-details from id', async () => {
        const updatedEntity: BankDetailsDTO = (
            await request(app.getHttpServer())
                .put('/api/bank-details/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE bank-details', async () => {
        const deletedEntity: BankDetailsDTO = (
            await request(app.getHttpServer())
                .delete('/api/bank-details/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
